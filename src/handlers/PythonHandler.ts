import { Input, Output } from "@/types";
import { CodeHandler } from "./CodeHandler";
import { Executer } from "@/executers/Executer";

export class PythonHandler extends CodeHandler {
  private pythonExecuter: Executer;

  constructor(pythonExecuter: Executer) {
    super();
    this.pythonExecuter = pythonExecuter;
  }

  async handleCode(input: Input): Promise<Output> {
    if (input.language === "python") {
      return this.pythonExecuter.runTest(input);
    } else {
      return super.handleCode(input);
    }
  }
}
