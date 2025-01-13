export interface Input {
  code: string;
  testCase: string;
  language: string;
}

export interface Output {
  output: string | null;
  error: string | null;
  runTime: number;
  opsPerSec: number;
}