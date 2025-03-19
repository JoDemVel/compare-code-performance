import { RequestQueue } from "@/handlers/RequestQueue";
import { PistonExecuter } from "./PistonExecuter";
import { Output } from "@/types";

export class PythonExecuter extends PistonExecuter {
  constructor(requestQueue: RequestQueue<Output>) {
    super(requestQueue)
  }

  addRunTimeCalc(code: string, testCase: string): string {
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

  addOpsPerSecCalc(code: string, testCase: string): string {
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

  addOutputFormat(code: string): string {
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