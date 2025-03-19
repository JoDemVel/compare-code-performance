import { Input, Output } from "@/types";

export interface Executer {
  runTest(input: Input): Promise<Output>;
}