const targets = await fetch("http://127.0.0.1:9229/json").then((response) =>
  response.json(),
);
const target = targets.find((item) => item.type === "page");
if (!target) throw new Error("No browser target available");
const socket = new WebSocket(target.webSocketDebuggerUrl);
const pending = new Map();
const errors = [];
let id = 0;
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    const handler = pending.get(message.id);
    pending.delete(message.id);
    message.error
      ? handler.reject(new Error(message.error.message))
      : handler.resolve(message.result);
  }
  if (message.method === "Runtime.exceptionThrown")
    errors.push(message.params.exceptionDetails.text);
  if (
    message.method === "Runtime.consoleAPICalled" &&
    ["error", "warning"].includes(message.params.type)
  )
    errors.push(
      message.params.args.map((arg) => arg.value || arg.description).join(" "),
    );
});
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const messageId = ++id;
    pending.set(messageId, { resolve, reject });
    socket.send(JSON.stringify({ id: messageId, method, params }));
  });
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const evaluate = async (expression) => {
  const result = await send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (result.exceptionDetails)
    throw new Error(
      result.exceptionDetails.exception?.description ||
        result.exceptionDetails.text,
    );
  return result.result.value;
};
await send("Runtime.enable");
await send("Page.enable");
await send("Page.navigate", { url: "http://127.0.0.1:5173/" });
await wait(2500);
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
  await wait(250);
  results.push(
    await evaluate(
      `(() => { const sections = [...document.querySelectorAll('main > section, main > .hero-root')]; const heading = document.querySelector('h1').getBoundingClientRect(); const projectVisuals = [...document.querySelectorAll('.project__visual')].map((node) => node.getBoundingClientRect()); return { viewport:'${width}x${height}', height:document.documentElement.scrollHeight, viewportHeights:+(document.documentElement.scrollHeight/innerHeight).toFixed(1), overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth, offenders:[...document.querySelectorAll('body *')].filter((node)=>{const box=node.getBoundingClientRect();return box.right>innerWidth+1||box.left<-1}).slice(0,5).map((node)=>node.className||node.tagName), order:sections.map((node)=>node.id||node.querySelector('section')?.className), h1Inside:heading.left>=-1&&heading.right<=innerWidth+1, projectCount:document.querySelectorAll('.project').length, projectsReadable:projectVisuals.every((box)=>box.width>=Math.min(300,innerWidth*.75)), sectionCount:sections.length, oldServices:Boolean(document.querySelector('#services')), oldTechnology:Boolean(document.querySelector('#technology')), oldPinnedProcess:Boolean(document.querySelector('[data-process-story]')), h1:document.querySelector('h1').textContent.replace(/\s+/g,' ').trim() } })()`,
    ),
  );
}
await send("Emulation.setDeviceMetricsOverride", {
  width: 1440,
  height: 900,
  deviceScaleFactor: 1,
  mobile: false,
});
await evaluate(`document.querySelector('#stack').scrollIntoView()`);
await wait(500);
await evaluate(
  `(() => { const button=document.querySelectorAll('.process-compact__steps button')[4]; button.focus(); button.click() })()`,
);
await wait(100);
const interactions = await evaluate(
  `(() => { const buttons=[...document.querySelectorAll('.process-compact__steps button')]; return { active:buttons.findIndex((button)=>button.classList.contains('is-active')), focusVisible:document.activeElement===buttons[4], nav:['home','work','about','stack','contact'].every((label)=>[...document.querySelectorAll('.desktop-nav a')].some((a)=>a.textContent.toLowerCase().includes(label))), projectRoutes:[...document.querySelectorAll('.project a')].every((a)=>a.getAttribute('href').startsWith('/work/')) } })()`,
);
await send("Emulation.setEmulatedMedia", {
  features: [{ name: "prefers-reduced-motion", value: "reduce" }],
});
await send("Page.reload");
await wait(2000);
const reduced = await evaluate(
  `({ mounted:document.querySelectorAll('main > section, main > .hero-root').length, marquee:getComputedStyle(document.querySelector('.stack-marquee > div')).animationPlayState, overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth })`,
);
console.log(
  JSON.stringify({ results, interactions, reduced, errors }, null, 2),
);
await send("Browser.close");
socket.close();
