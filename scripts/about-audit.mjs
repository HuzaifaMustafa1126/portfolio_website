import { writeFile } from 'node:fs/promises'

const targets = await fetch('http://127.0.0.1:9224/json').then((response) => response.json())
const target = targets.find((item) => item.type === 'page' && item.url === 'about:blank')
if (!target) throw new Error('No browser target available')

const socket = new WebSocket(target.webSocketDebuggerUrl)
const pending = new Map()
const consoleErrors = []
let id = 0

await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true })
  socket.addEventListener('error', reject, { once: true })
})
socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data)
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id)
    pending.delete(message.id)
    if (message.error) reject(new Error(message.error.message))
    else resolve(message.result)
  }
  if (message.method === 'Runtime.exceptionThrown') consoleErrors.push(message.params.exceptionDetails.text)
})

const send = (method, params = {}) => new Promise((resolve, reject) => {
  const messageId = ++id
  pending.set(messageId, { resolve, reject })
  socket.send(JSON.stringify({ id: messageId, method, params }))
})
const wait = (duration) => new Promise((resolve) => setTimeout(resolve, duration))
const evaluate = async (expression) => {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
  return result.result.value
}

await send('Runtime.enable')
await send('Page.enable')
await send('Page.navigate', { url: 'http://127.0.0.1:5173/' })
await wait(2200)

const viewports = [[1920, 1080], [1600, 900], [1440, 900], [1366, 768], [1280, 800], [1024, 768], [768, 900], [430, 900], [390, 844], [375, 812], [360, 800]]
const results = []
for (const [width, height] of viewports) {
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width <= 430 })
  await wait(180)
  await evaluate('window.scrollTo(0, document.querySelector("#about").offsetTop + 120)')
  await wait(120)
  results.push(await evaluate(`(() => {
    const about = document.querySelector('#about')
    const image = document.querySelector('[data-about-image]')
    const statement = document.querySelector('.about-statement').getBoundingClientRect()
    const expertise = [...document.querySelectorAll('[data-expertise-row]')].every((row) => row.getBoundingClientRect().right <= innerWidth + 1)
    return {
      viewport: '${width}x${height}',
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      h1Count: document.querySelectorAll('h1').length,
      h2Count: document.querySelectorAll('h2').length,
      statementInside: statement.left >= -1 && statement.right <= innerWidth + 1,
      imageLoaded: image.complete && image.naturalWidth > 0,
      expertiseInside: expertise,
      darkBackground: getComputedStyle(document.querySelector('.about-approach')).color !== 'rgb(17, 17, 17)',
      aboutHeight: Math.round(about.getBoundingClientRect().height),
      hasPinSpacer: !!document.querySelector('.pin-spacer'),
    }
  })()`))
}

await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })
await evaluate(`(() => { const element = document.querySelector('.about-statement'); window.scrollTo(0, element.getBoundingClientRect().top + scrollY + element.offsetHeight * 0.55) })()`)
await wait(500)
const wordState = await evaluate(`(() => ({
  activeWords: [...document.querySelectorAll('[data-about-word]')].filter((word) => Number(getComputedStyle(word).opacity) > 0.5).length,
  wordCount: document.querySelectorAll('[data-about-word]').length,
}))()`)
await evaluate(`(() => { const element = document.querySelector('[data-experience-value]'); window.scrollTo(0, element.getBoundingClientRect().top + scrollY - innerHeight * 0.7) })()`)
await wait(1600)
const counterState = await evaluate(`document.querySelector('[data-experience-value]').textContent`)
await evaluate(`(() => { const element = document.querySelector('[data-about-image-frame]'); window.scrollTo(0, element.getBoundingClientRect().top + scrollY - innerHeight * 0.65) })()`)
await wait(1600)
const imageState = await evaluate(`(() => ({
  imageClip: getComputedStyle(document.querySelector('[data-about-image-frame]')).clipPath,
  imageLoaded: document.querySelector('[data-about-image]').complete && document.querySelector('[data-about-image]').naturalWidth > 0,
}))()`)

await evaluate(`(() => { const element = document.querySelector('#about'); window.scrollTo(0, element.getBoundingClientRect().top + scrollY + 60) })()`)
await wait(1400)
const lightShot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
await writeFile('about-audit-light.png', Buffer.from(lightShot.data, 'base64'))
await evaluate(`(() => { const element = document.querySelector('#approach'); window.scrollTo(0, element.getBoundingClientRect().top + scrollY + 80) })()`)
await wait(1400)
const darkShot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
await writeFile('about-audit-dark.png', Buffer.from(darkShot.data, 'base64'))

await send('Page.navigate', { url: 'http://127.0.0.1:5173/about' })
await wait(1600)
const remountState = await evaluate(`({ aboutCount: document.querySelectorAll('#about').length, processCount: document.querySelectorAll('[data-process-item]').length })`)

console.log(JSON.stringify({ results, wordState, counterState, imageState, remountState, consoleErrors }, null, 2))
await send('Browser.close')
socket.close()
