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

    if (result === undefined) {
      ctx.postMessage({
        output: null,
        error: "Unexpected undefined output. Make sure you are returning a value from the function.",
        runTime,
        opsPerSec: 0,
      } as Output);
      return;
    }

    let opsPerSec = 0;
    const start = Date.now();
    const end = start + 1000;
    while (Date.now() < end) {
      fn();
      opsPerSec++;
    }

    ctx.postMessage({ output: JSON.stringify(result), error: null, runTime, opsPerSec} as Output);
  } catch (error) {
    ctx.postMessage({ output: null, error: (error as Error).message, runTime: 0, opsPerSec: 0 } as Output);
  }
};