import { Input, Output } from "@/types";
import { Executer } from "@/executers/Executer";
import Worker from '@/workers/jsRunner.ts?worker';

export class JavaScriptExecuter implements Executer {
  async runTest(input: Input): Promise<Output> {
    const worker = new Worker();
    worker.postMessage({ code: input.code, testCase: input.testCase });
    return new Promise((resolve) => {
      worker.onmessage = (event: MessageEvent<Output>) => {
        resolve(event.data);
        worker.terminate();
      }
    });
  }
}