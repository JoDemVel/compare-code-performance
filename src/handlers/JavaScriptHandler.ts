import { CodeHandler } from "@/handlers/CodeHandler";
import { Input, Output } from "@/types";
import Worker from '@/workers/jsRunner.ts?worker';

async function runTest(input: Input) {
  const worker = new Worker();
  worker.postMessage({ code: input.code, functionName: "multiply", testCase: "multiply(2.1, 3.3)" });
  return new Promise((resolve) => {
    worker.onmessage = (event: MessageEvent<Output>) => {
      resolve(event.data);
      worker.terminate();
    }
  });
}

export class JavaScriptHandler extends CodeHandler {
  async handleCode(input: Input): Promise<Output> {
    if (input.language === "javascript") {
      const result = await runTest(input);
      console.log(result);
      
      return { output: null, error: null, opsPerSec: 0, runTime: 0 };
    } else {
      return super.handleCode(input);
    }
  }
}