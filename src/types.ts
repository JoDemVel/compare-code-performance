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

export interface TestCase {
  id: string;
  title: string;
  testCase: string;
}

export interface Language {
  id: string;
  name: string;
  version?: string;
  tabSize?: number;
}