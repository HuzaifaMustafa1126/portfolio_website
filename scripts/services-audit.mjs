import { writeFile } from 'node:fs/promises'

const targets = await fetch('http://127.0.0.1:9225/json').then((response) => response.json())
const target = targets.find((item) => item.type === 'page' && item.url === 'about:blank')
if (!target) throw new Error('No browser target available')
const socket = new WebSocket(target.webSocketDebuggerUrl)
const pending = new Map()
const consoleErrors = []
let id = 0
await new Promise((resolve, reject) => { socket.addEventListener('open', resolve, { once: true }); socket.addEventListener('error', reject, { once: true }) })
socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data)
  if (message.id && pending.has(message.id)) { const { resolve, reject } = pending.get(message.id); pending.delete(message.id); if (message.error) reject(new Error(message.error.message)); else resolve(message.result) }
  if (message.method === 'Runtime.exceptionThrown') consoleErrors.push(message.params.exceptionDetails.text)
})
const send = (method, params = {}) => new Promise((resolve, reject) => { const messageId = ++id; pending.set(messageId, { resolve, reject }); socket.send(JSON.stringify({ id: messageId, method, params })) })
const wait = (duration) => new Promise((resolve) => setTimeout(resolve, duration))
const evaluate = async (expression) => { const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }); if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text); return result.result.value }

await send('Runtime.enable')
await send('Page.enable')
await send('Page.navigate', { url: 'http://127.0.0.1:5173/' })
await wait(2400)

const viewports = [[1920, 1080], [1600, 900], [1440, 900], [1366, 768], [1280, 800], [1024, 768], [768, 900], [430, 900], [390, 844], [375, 812], [360, 800]]
const results = []
for (const [width, height] of viewports) {
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width <= 430 })
  await evaluate(`(() => { const section = document.querySelector('#services'); window.scrollTo(0, section.getBoundingClientRect().top + scrollY + 80) })()`)
  await wait(850)
  results.push(await evaluate(`(() => {
    const titles = [...document.querySelectorAll('.service-row h3')].map((title) => title.getBoundingClientRect())
    const buttons = [...document.querySelectorAll('.service-row > button')]
    return {
      viewport: '${width}x${height}',
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      titleCount: titles.length,
      titlesInside: titles.every((title) => title.left >= -1 && title.right <= innerWidth + 1),
      buttonsAccessible: buttons.every((button) => button.tagName === 'BUTTON' && button.hasAttribute('aria-expanded') && button.hasAttribute('aria-controls')),
      previewShownInLayout: getComputedStyle(document.querySelector('.service-preview')).display !== 'none',
      h2Count: document.querySelectorAll('h2').length,
    }
  })()`))
}

await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })
await evaluate(`(() => { const section = document.querySelector('#services'); window.scrollTo(0, section.getBoundingClientRect().top + scrollY + 60) })()`)
await wait(1400)
const introShot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
await writeFile('services-audit-intro.png', Buffer.from(introShot.data, 'base64'))
await evaluate(`(() => { const list = document.querySelector('.services-list'); window.scrollTo(0, list.getBoundingClientRect().top + scrollY - 120) })()`)
await wait(1400)
const rowPoint = await evaluate(`(() => { const box = document.querySelector('.service-row:nth-child(2) button').getBoundingClientRect(); return { x: box.left + box.width * 0.45, y: box.top + box.height / 2 } })()`)
await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: rowPoint.x, y: rowPoint.y })
await wait(650)
const previewState = await evaluate(`(() => ({ visible: document.querySelector('.service-preview').classList.contains('service-preview--visible'), activeImage: [...document.querySelectorAll('[data-preview-image]')].find((image) => Number(getComputedStyle(image).opacity) > 0.5)?.dataset.previewImage }))()`)

await evaluate(`document.querySelector('.service-row:nth-child(1) button').click()`)
await wait(750)
await evaluate(`document.querySelector('.service-row:nth-child(2) button').click()`)
await wait(750)
const accordionState = await evaluate(`(() => ({ expandedCount: document.querySelectorAll('.service-row button[aria-expanded="true"]').length, secondExpanded: document.querySelector('.service-row:nth-child(2) button').getAttribute('aria-expanded'), secondHeight: Math.round(document.querySelector('#service-details-2').getBoundingClientRect().height), firstHidden: document.querySelector('#service-details-1').hidden }))()`)
const listShot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
await writeFile('services-audit-list.png', Buffer.from(listShot.data, 'base64'))

await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true })
await wait(250)
const mobileState = await evaluate(`(() => ({ previewHidden: getComputedStyle(document.querySelector('.service-preview')).display === 'none', inlineImageVisible: getComputedStyle(document.querySelector('#service-details-2 .service-details__image')).display !== 'none', overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth }))()`)

await send('Page.navigate', { url: 'http://127.0.0.1:5173/services' })
await wait(1700)
const remountState = await evaluate(`({ servicesCount: document.querySelectorAll('#services').length, rowCount: document.querySelectorAll('.service-row').length })`)
console.log(JSON.stringify({ results, previewState, accordionState, mobileState, remountState, consoleErrors }, null, 2))
await send('Browser.close')
socket.close()
