import { Input, Output, PistonResult } from "@/types";
import { Executer } from "@/executers/Executer";
import { RequestQueue } from "@/handlers/RequestQueue";
import axios from "axios";

export abstract class PistonExecuter implements Executer {
  private requestQueue: RequestQueue<Output>;
  
  constructor(requestQueue: RequestQueue<Output>) {
    this.requestQueue = requestQueue;
  }

  async runTest(input: Input): Promise<Output> {
    let code = this.addRunTimeCalc(input.code, input.testCase);
    code = this.addOpsPerSecCalc(code, input.testCase);
    code = this.addOutputFormat(code);
    return this.runExternal(code, input.language, input.version!, input.fileExtension!);
  }

  abstract addRunTimeCalc(code: string, testCase: string): string;
  abstract addOpsPerSecCalc(code: string, testCase: string): string;
  abstract addOutputFormat(code: string): string;

  async runExternal(codeContent: string, language: string, version: string, fileExtension: string): Promise<Output> {
    return new Promise<Output>((resolve) => {
      this.requestQueue.addRequest(async () => {
        const url = "https://emkc.org/api/v2/piston/execute";
        const payload = {
          language,
          version: version,
          files: [{ name: `script.${fileExtension}`, content: codeContent }],
        };
  
        try {
          const response = await axios.post<PistonResult>(url, payload);
          const data = response.data;
  
          if (data.run.code !== 0) {
            const output: Output = {
              output: null,
              error: data.run.stderr,
              runTime: 0,
              opsPerSec: 0,
            };
            resolve(output);
            return output;
          }
  
          const runOutput = JSON.parse(data.run.output);
          const output: Output = {
            output: runOutput.output,
            error: data.run.stderr,
            runTime: runOutput.execTime,
            opsPerSec: runOutput.opsPerSec,
          };
          resolve(output);
          return output;
  
        } catch (error) {
          const output: Output = {
            output: null,
            error: (error as Error).message,
            runTime: 0,
            opsPerSec: 0,
          };
          resolve(output);
          return output;
        }
      });
    });
  }
}