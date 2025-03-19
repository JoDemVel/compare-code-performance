import { Input, Output, PistonResult } from "@/types";
import { CodeHandler } from "./CodeHandler";
import axios from 'axios';
import { RequestQueue } from "./RequestQueue";

export class PythonHandler extends CodeHandler {
  private requestQueue: RequestQueue<Output>;

  constructor(requestQueue: RequestQueue<Output>) {
    super();
    this.requestQueue = requestQueue;
  }

  async handleCode(input: Input): Promise<Output> {
    if (input.language === "python") {
      return this.runTest(input);
    } else {
      return super.handleCode(input);
    }
  }

  async runTest(input: Input): Promise<Output> {
    let code = this.addRunTimeCalc(input.code, input.testCase);
    code = this.addOpsPerSecCalc(code, input.testCase);
    code = this.addOutput(code);
    return this.runExternal(code, input.language, input.version!);
  }

  async runExternal(codeContent: string, language: string, version: string): Promise<Output> {
    return new Promise<Output>((resolve) => {
      this.requestQueue.addRequest(async () => {
        const url = "https://emkc.org/api/v2/piston/execute";
        const payload = {
          language,
          version: version,
          files: [{ name: "script.py", content: codeContent }],
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

  private addRunTimeCalc(code: string, testCase: string): string {
    return [
      "import time",
      "",
      code,
      "",
      "start_time = time.perf_counter()",
      `result = ${testCase}`,
      "end_time = time.perf_counter()",
      "run_time = (end_time - start_time) * 1000",
      "",
    ].join("\n");
  }

  private addOpsPerSecCalc(code: string, testCase: string): string {
    return [
      "import time",
      "",
      code,
      "",
      "ops_per_sec = 0",
      "benchmark_start = time.perf_counter()",
      "while time.perf_counter() - benchmark_start < 1:",
      `    ${testCase}`,
      "    ops_per_sec += 1",
      "",
    ].join("\n");
  }

  private addOutput(code: string): string {
    return [
      "import json",
      code,
      "",
      "output = {",
      '    "output": result,',
      '    "execTime": round(run_time, 6),',
      '    "opsPerSec": ops_per_sec',
      "}",
      "",
      "print(json.dumps(output))"
    ].join("\n");
  }
}
