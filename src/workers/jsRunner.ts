import { Input, Output } from "@/types";

const ctx: Worker = self as unknown as Worker;

ctx.onmessage = async (event: MessageEvent<Input>) => {
  const { code, testCase } = event.data;
  const fn = new Function(`${code}; return ${testCase};`);

  try {
    const timeStart = performance.now();
    const result = fn();
    const timeEnd = performance.now();
    const runTime = (timeEnd - timeStart);
    let opsPerSec = 0;
    const start = Date.now();
    const end = start + 1000;
    while (Date.now() < end) {
      fn();
      opsPerSec++;
    }

    ctx.postMessage({ output: result, error: null, runTime, opsPerSec} as Output);
  } catch (error) {
    ctx.postMessage({ output: null, error: (error as Error).message } as Output);
  }
};