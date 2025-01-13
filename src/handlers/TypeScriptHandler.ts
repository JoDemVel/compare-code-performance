import { CodeHandler } from "@/handlers/CodeHandler";
import { Input, Output } from "@/types";
import ts from "typescript";

export class TypeScriptHandler extends CodeHandler {
  async handleCode(input: Input): Promise<Output> {
    if (input.language === "typescript") {
      const code = ts.transpile(input.code);
      return super.handleCode({ language: "javascript", code, testCase: input.testCase });
    } else {
      return super.handleCode(input);
    }
  }
}