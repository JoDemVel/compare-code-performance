import { CodeHandler } from "@/handlers/CodeHandler";
import { Input, Output } from "@/types";
import Worker from '@/workers/jsRunner.ts?worker';

async function runTest(input: Input): Promise<Output> {
  const worker = new Worker();
  worker.postMessage({ code: input.code, testCase: input.testCase });
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
      return runTest(input);
    } else {
      return super.handleCode(input);
    }
  }
}