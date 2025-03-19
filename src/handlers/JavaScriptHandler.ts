import { CodeHandler } from "@/handlers/CodeHandler";
import { Input, Output } from "@/types";
import { Executer } from "@/executers/Executer";

export class JavaScriptHandler extends CodeHandler {
  private executer: Executer;

  constructor(executer: Executer) {
    super();
    this.executer = executer;
  }

  async handleCode(input: Input): Promise<Output> {
    if (input.language === "javascript") {
      return this.executer.runTest(input);
    } else {
      return super.handleCode(input);
    }
  }
}