const targets = await fetch('http://127.0.0.1:9228/json').then((response) => response.json())
const target = targets.find((item) => item.type === 'page')
if (!target) throw new Error('No browser target available')
const socket = new WebSocket(target.webSocketDebuggerUrl)
const pending = new Map()
const consoleErrors = []
let id = 0
await new Promise((resolve, reject) => { socket.addEventListener('open', resolve, { once: true }); socket.addEventListener('error', reject, { once: true }) })
socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data)
  if (message.id && pending.has(message.id)) { const handler = pending.get(message.id); pending.delete(message.id); message.error ? handler.reject(new Error(message.error.message)) : handler.resolve(message.result) }
  if (message.method === 'Runtime.exceptionThrown') consoleErrors.push(message.params.exceptionDetails.text)
  if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') consoleErrors.push(message.params.args.map((arg) => arg.value || arg.description).join(' '))
})
const send = (method, params = {}) => new Promise((resolve, reject) => { const messageId = ++id; pending.set(messageId, { resolve, reject }); socket.send(JSON.stringify({ id: messageId, method, params })) })
const wait = (duration) => new Promise((resolve) => setTimeout(resolve, duration))
const evaluate = async (expression) => { const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }); if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text); return result.result.value }

await send('Runtime.enable')
await send('Page.enable')
await send('Page.navigate', { url: 'http://127.0.0.1:5173/' })
await wait(2200)
const mounted = await evaluate(`Boolean(document.querySelector('#process'))`)
if (!mounted) throw new Error(`Process did not mount: ${await evaluate(`document.body.innerText.slice(-2000)`)}`)

const viewports = [[1920,1080],[1600,900],[1440,900],[1366,768],[1280,800],[1024,768],[768,900],[430,900],[390,844],[375,812],[360,800]]
const results = []
for (const [width, height] of viewports) {
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width <= 430 })
  await evaluate(`(() => { const section = document.querySelector('#process'); window.scrollTo(0, section.getBoundingClientRect().top + scrollY + 100) })()`)
  await wait(500)
  results.push(await evaluate(`(() => {
    const section = document.querySelector('#process')
    const stage = section.querySelector('[data-process-stage]')
    const steps = [...section.querySelectorAll('[data-process-step]')]
    return { viewport: '${width}x${height}', overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth, headingInside: (() => { const box = section.querySelector('h2').getBoundingClientRect(); return box.left >= -1 && box.right <= innerWidth + 1 })(), stepCount: steps.length, allStepsVisible: steps.every((step) => getComputedStyle(step).visibility !== 'hidden'), navigationVisible: getComputedStyle(section.querySelector('.process-navigation')).display !== 'none', stagePosition: getComputedStyle(stage).position }
  })()`))
}

await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })
await evaluate(`(() => { const story = document.querySelector('[data-process-story]'); window.scrollTo(0, story.getBoundingClientRect().top + scrollY) })()`)
await wait(650)
const desktopStages = []
for (const fraction of [0, .2, .4, .6, .8, 1]) {
  await evaluate(`(() => { const story = document.querySelector('[data-process-story]'); const top = story.getBoundingClientRect().top + scrollY; window.scrollTo(0, top + (story.offsetHeight - innerHeight) * ${fraction}) })()`)
  await wait(500)
  desktopStages.push(await evaluate(`(() => ({ active: [...document.querySelectorAll('.process-navigation button')].findIndex((button) => button.classList.contains('is-active')), visible: [...document.querySelectorAll('[data-process-step]')].findIndex((step) => Number(getComputedStyle(step.querySelector('.process-step__main')).opacity) > .5), progress: getComputedStyle(document.querySelector('[data-process-progress]')).transform }))()`))
}
await evaluate(`document.querySelectorAll('.process-navigation button')[2].focus()`)
await evaluate(`document.activeElement.click()`)
await wait(2200)
const keyboard = await evaluate(`({ focusedButton: document.activeElement.tagName === 'BUTTON', focused: document.activeElement.textContent.trim(), selectedAfterActivation: [...document.querySelectorAll('.process-navigation button')].findIndex((button) => button.classList.contains('is-active')) })`)

await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
await send('Page.reload')
await wait(3000)
if (!(await evaluate(`Boolean(document.querySelector('#process'))`))) throw new Error('Process did not remount in reduced-motion mode')
const reducedMotion = await evaluate(`(() => ({ allStepsVisible: [...document.querySelectorAll('[data-process-step]')].every((step) => getComputedStyle(step).visibility !== 'hidden'), storyHeight: document.querySelector('[data-process-story]').offsetHeight, navigationHidden: getComputedStyle(document.querySelector('.process-navigation')).display === 'none', overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth }))()`)

console.log(JSON.stringify({ results, desktopStages, keyboard, reducedMotion, consoleErrors }, null, 2))
await send('Browser.close')
socket.close()
