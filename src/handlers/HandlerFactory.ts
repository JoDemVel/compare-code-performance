import { CodeHandler } from "@/handlers/CodeHandler";
import { JavaScriptHandler } from "@/handlers/JavaScriptHandler";
import { TypeScriptHandler } from "@/handlers/TypeScriptHandler";

export interface HandlerFactory {
  createHandler(): CodeHandler;
}

export class CodeHandlerFactory implements HandlerFactory {
  createHandler(): CodeHandler {
    const jsHandler = new JavaScriptHandler();
    const tsHandler = new TypeScriptHandler();

    tsHandler.setNext(jsHandler);

    return tsHandler;
  }
}