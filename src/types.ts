export interface Input {
  code: string;
  testCase: string;
  language: string;
  version?: string;
  fileExtension?: string;
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
  fileExtension: string;
}

export interface Code {
  languageId: string;
  code: string;
}

export interface EditorProperty {
  idEditor: string;
  title: string;
  values: Code[];
}

export interface UnitResult {
  editorTitle: string;
  output: Output;
}

export interface Result {
  index: number;
  testCaseId: string;
  testCase: string;
  results: UnitResult[];
}

interface PistonRunResult {
  code: number;
  output: string;
  signal: string | null;
  stderr: string;
  stdout: string;
}

export interface PistonResult {
  language: string;
  run: PistonRunResult;
  version: string;
}
