const targets = await fetch('http://127.0.0.1:9222/json').then((response) => response.json())
const target = targets.find((item) => item.type === 'page' && (item.url === 'about:blank' || item.url.startsWith('http://127.0.0.1:5173')))
if (!target) throw new Error('No browser target available')

const socket = new WebSocket(target.webSocketDebuggerUrl)
const pending = new Map()
let id = 0
const consoleErrors = []

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
await wait(1600)

const viewports = [
  [1920, 1080], [1440, 900], [1280, 800], [1024, 768], [768, 900], [430, 900], [390, 844], [360, 800],
]
const results = []

for (const [width, height] of viewports) {
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width <= 430 })
  await wait(120)
  results.push(await evaluate(`(() => {
    const trigger = document.querySelector('.menu-trigger')
    const header = document.querySelector('.site-header')
    return {
      viewport: '${width}x${height}',
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      triggerVisible: !!trigger && trigger.getBoundingClientRect().right <= innerWidth && trigger.getBoundingClientRect().left >= 0,
      headerWidth: Math.round(header.getBoundingClientRect().width),
    }
  })()`))
}

await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true })
await evaluate(`document.querySelector('.menu-trigger').click()`)
await wait(1300)
const openState = await evaluate(`(() => ({
  ariaExpanded: document.querySelector('.menu-trigger').getAttribute('aria-expanded'),
  ariaHidden: document.querySelector('#fullscreen-menu').getAttribute('aria-hidden'),
  bodyLocked: document.body.classList.contains('menu-scroll-lock'),
  activeElement: document.activeElement?.className,
  menuOverflow: document.querySelector('#fullscreen-menu').scrollWidth > innerWidth,
}))()`)

await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 })
await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 })
await wait(1100)
const closedState = await evaluate(`(() => ({
  ariaExpanded: document.querySelector('.menu-trigger').getAttribute('aria-expanded'),
  ariaHidden: document.querySelector('#fullscreen-menu').getAttribute('aria-hidden'),
  bodyLocked: document.body.classList.contains('menu-scroll-lock'),
  focusRestored: document.activeElement === document.querySelector('.menu-trigger'),
}))()`)

console.log(JSON.stringify({ results, openState, closedState, consoleErrors }, null, 2))
await send('Browser.close')
socket.close()
