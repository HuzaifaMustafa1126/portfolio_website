const targets = await fetch('http://127.0.0.1:9227/json').then((response) => response.json())
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
})
const send = (method, params = {}) => new Promise((resolve, reject) => { const messageId = ++id; pending.set(messageId, { resolve, reject }); socket.send(JSON.stringify({ id: messageId, method, params })) })
const wait = (duration) => new Promise((resolve) => setTimeout(resolve, duration))
const evaluate = async (expression) => { const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }); if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text); return result.result.value }

await send('Runtime.enable')
await send('Page.enable')
await send('Page.navigate', { url: 'http://127.0.0.1:5173/' })
await wait(2200)

const viewports = [[1920, 1080], [1600, 900], [1440, 900], [1366, 768], [1280, 800], [1024, 768], [768, 900], [430, 900], [390, 844], [375, 812], [360, 800]]
const results = []
for (const [width, height] of viewports) {
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width <= 430 })
  await evaluate(`(() => { const section = document.querySelector('#technology'); window.scrollTo(0, section.offsetTop + 80) })()`)
  await wait(450)
  results.push(await evaluate(`(() => {
    const section = document.querySelector('#technology')
    const headings = [...section.querySelectorAll('h2, h3')].map((node) => node.getBoundingClientRect())
    const panels = [...section.querySelectorAll('[data-feature-panel]')]
    return {
      viewport: '${width}x${height}',
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      headingsInside: headings.every((box) => box.left >= -1 && box.right <= innerWidth + 1),
      previewVisible: getComputedStyle(section.querySelector('.technology-preview')).display !== 'none',
      featurePanelsVisible: panels.filter((panel) => getComputedStyle(panel).visibility !== 'hidden').length,
      categoryCount: section.querySelectorAll('[data-tech-category]').length,
      featureCount: panels.length,
    }
  })()`))
}

await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })
await evaluate(`(() => { const section = document.querySelector('#technology'); window.scrollTo(0, section.offsetTop + section.querySelector('.technology-index').offsetTop - 100) })()`)
await wait(700)
const point = await evaluate(`(() => { const box = document.querySelector('.technology-category:nth-child(2) button:nth-child(2)').getBoundingClientRect(); return { x: box.left + 8, y: box.top + 8 } })()`)
await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: point.x, y: point.y })
await wait(300)
const interaction = await evaluate(`(() => ({ previewTitle: document.querySelector('.technology-preview h3').textContent, previewMark: document.querySelector('.technology-preview > div span').textContent }))()`)

await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
await send('Page.reload')
await wait(1400)
const reducedMotion = await evaluate(`(() => ({ section: Boolean(document.querySelector('#technology')), featurePanels: document.querySelectorAll('[data-feature-panel]').length, marqueeState: getComputedStyle(document.querySelector('.technology-marquee > div')).animationPlayState }))()`)

console.log(JSON.stringify({ results, interaction, reducedMotion, consoleErrors }, null, 2))
await send('Browser.close')
socket.close()
