const targets = await fetch("http://127.0.0.1:9231/json").then((r) => r.json());
const target = targets.find((x) => x.type === "page");
if (!target) throw new Error("No page");
const ws = new WebSocket(target.webSocketDebuggerUrl),
  pending = new Map(),
  errors = [];
let id = 0;
await new Promise((resolve, reject) => {
  ws.addEventListener("open", resolve, { once: true });
  ws.addEventListener("error", reject, { once: true });
});
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    const h = pending.get(m.id);
    pending.delete(m.id);
    m.error ? h.reject(new Error(m.error.message)) : h.resolve(m.result);
  }
  if (m.method === "Runtime.exceptionThrown")
    errors.push(m.params.exceptionDetails.text);
  if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error")
    errors.push(m.params.args.map((a) => a.value || a.description).join(" "));
});
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const n = ++id;
    pending.set(n, { resolve, reject });
    ws.send(JSON.stringify({ id: n, method, params }));
  });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const evaluate = async (expression) => {
  const r = await send("Runtime.evaluate", { expression, returnByValue: true });
  if (r.exceptionDetails)
    throw new Error(
      r.exceptionDetails.exception?.description || r.exceptionDetails.text,
    );
  return r.result.value;
};
await send("Runtime.enable");
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: 1440,
  height: 900,
  deviceScaleFactor: 1,
  mobile: false,
});
await send("Page.navigate", { url: "http://127.0.0.1:5173/" });
await wait(2200);
await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 100, y: 200 });
await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 130, y: 210 });
await wait(80);
const smallMoveCount = await evaluate(
  `document.querySelectorAll('.tech-trail-token').length`,
);
const points = [
  [210, 220],
  [290, 250],
  [370, 290],
  [450, 340],
  [530, 400],
  [610, 470],
  [690, 540],
  [770, 610],
  [850, 670],
  [930, 610],
  [1010, 540],
  [1090, 470],
  [1170, 390],
  [1250, 300],
];
const sequence = [];
for (const [x, y] of points) {
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x, y });
  await wait(35);
  sequence.push(
    await evaluate(
      `[...document.querySelectorAll('.tech-trail-token')].at(-1)?.dataset.technology||null`,
    ),
  );
}
const activePeak = await evaluate(
  `document.querySelectorAll('.tech-trail-token').length`,
);
const layer = await evaluate(
  `(()=>{const l=document.querySelector('[data-tech-trail]');return{z:getComputedStyle(l).zIndex,pointer:getComputedStyle(l).pointerEvents,sequence:l.dataset.sequence}})()`,
);
await wait(2600);
const afterExpiry = await evaluate(
  `document.querySelectorAll('.tech-trail-token').length`,
);
await send("Emulation.setDeviceMetricsOverride", {
  width: 390,
  height: 844,
  deviceScaleFactor: 1,
  mobile: true,
});
await send("Page.reload");
await wait(1700);
const mobile = await evaluate(
  `({layerDisplay:getComputedStyle(document.querySelector('[data-tech-trail]')).display,count:document.querySelectorAll('.tech-trail-token').length,overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth})`,
);
await send("Emulation.setEmulatedMedia", {
  features: [{ name: "prefers-reduced-motion", value: "reduce" }],
});
await send("Emulation.setDeviceMetricsOverride", {
  width: 1440,
  height: 900,
  deviceScaleFactor: 1,
  mobile: false,
});
await send("Page.reload");
await wait(1700);
await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 100, y: 100 });
await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 300, y: 300 });
await wait(100);
const reducedCount = await evaluate(
  `document.querySelectorAll('.tech-trail-token').length`,
);
console.log(
  JSON.stringify(
    {
      smallMoveCount,
      sequence,
      activePeak,
      afterExpiry,
      layer,
      mobile,
      reducedCount,
      errors,
    },
    null,
    2,
  ),
);
await send("Browser.close");
ws.close();
