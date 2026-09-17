const targets = await fetch("http://127.0.0.1:9223/json").then((response) =>
  response.json(),
);
const target = targets.find(
  (item) => item.type === "page" && item.url === "about:blank",
);
if (!target) throw new Error("No browser target available");

const socket = new WebSocket(target.webSocketDebuggerUrl);
const pending = new Map();
const consoleErrors = [];
let id = 0;

await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
  }
  if (message.method === "Runtime.exceptionThrown")
    consoleErrors.push(message.params.exceptionDetails.text);
});

const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const messageId = ++id;
    pending.set(messageId, { resolve, reject });
    socket.send(JSON.stringify({ id: messageId, method, params }));
  });
const wait = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));
const evaluate = async (expression) => {
  const result = await send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  return result.result.value;
};

await send("Runtime.enable");
await send("Page.enable");
await send("Page.navigate", { url: "http://127.0.0.1:5173/" });
await wait(2400);

const viewports = [
  [1920, 1080],
  [1600, 900],
  [1440, 900],
  [1366, 768],
  [1280, 800],
  [1024, 768],
  [768, 900],
  [430, 900],
  [390, 844],
  [375, 812],
  [360, 800],
];
const results = [];

for (const [width, height] of viewports) {
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width <= 430,
  });
  await wait(180);
  results.push(
    await evaluate(`(() => {
    const heading = document.querySelector('#hero-title').getBoundingClientRect()
    const lines = [...document.querySelectorAll('[data-hero-line]')].map((line) => line.getBoundingClientRect())
    const portrait = document.querySelector('.hero-portrait').getBoundingClientRect()
    const header = document.querySelector('.site-header').getBoundingClientRect()
    return {
      viewport: '${width}x${height}',
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      h1Count: document.querySelectorAll('h1').length,
      headingInside: heading.left >= -1 && heading.right <= innerWidth + 1,
      linesInside: lines.every((line) => line.left >= -1 && line.right <= innerWidth + 1),
      portraitInside: portrait.left >= -1 && portrait.right <= innerWidth + 1,
      portraitLoaded: document.querySelector('[data-hero-image]').naturalWidth > 0,
      headerVisible: header.bottom > 0,
      heroHeight: Math.round(document.querySelector('.hero').getBoundingClientRect().height),
      headingSize: getComputedStyle(document.querySelector('#hero-title')).fontSize,
    }
  })()`),
  );
}

await send("Emulation.setDeviceMetricsOverride", {
  width: 1440,
  height: 900,
  deviceScaleFactor: 1,
  mobile: false,
});
await evaluate(
  'window.scrollTo(0, document.querySelector(".hero").offsetHeight * 0.65)',
);
await wait(700);
const scrollState = await evaluate(`(() => ({
  pageScrolled: scrollY > 0,
  headingTransformed: getComputedStyle(document.querySelector('[data-title-creative]')).transform !== 'none',
  portraitTransformed: getComputedStyle(document.querySelector('[data-hero-image]')).transform !== 'none',
}))()`);

await send("Page.navigate", { url: "http://127.0.0.1:5173/about" });
await wait(1800);
const remountState = await evaluate(
  `({ h1Count: document.querySelectorAll('h1').length, heroCount: document.querySelectorAll('.hero').length })`,
);

console.log(
  JSON.stringify(
    { results, scrollState, remountState, consoleErrors },
    null,
    2,
  ),
);
await send("Browser.close");
socket.close();
