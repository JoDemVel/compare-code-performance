import { CodeHandler } from "@/handlers/CodeHandler";
import { JavaScriptHandler } from "@/handlers/JavaScriptHandler";
import { TypeScriptHandler } from "@/handlers/TypeScriptHandler";
import { PythonHandler } from "@/handlers/PythonHandler";
import { RequestQueue } from "./RequestQueue";
import { Output } from "@/types";
import { JavaScriptExecuter } from "@/executers/JavaScriptExecuter";
import { PythonExecuter } from "@/executers/piston-executers/PythonExecuter";

export interface HandlerFactory {
  createHandler(): CodeHandler;
}

export class CodeHandlerFactory implements HandlerFactory {
  createHandler(): CodeHandler {
    const jsHandler = new JavaScriptHandler(new JavaScriptExecuter());
    const tsHandler = new TypeScriptHandler();
    const pyHandler = new PythonHandler(new PythonExecuter(new RequestQueue<Output>()));

    tsHandler.setNext(jsHandler);
    jsHandler.setNext(pyHandler);

    return tsHandler;
  }
}