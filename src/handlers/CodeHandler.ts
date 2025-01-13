import { Input, Output } from "@/types";

export abstract class CodeHandler {
  private nextHandler: CodeHandler | null = null;

  setNext(handler: CodeHandler): CodeHandler {
    this.nextHandler = handler;
    return handler;
  }

  async handleCode(input: Input): Promise<Output> {
    if (this.nextHandler) {
      return this.nextHandler.handleCode(input);
    }
    return { output: null, error: null, opsPerSec: 0, runTime: 0 };
  }
}

