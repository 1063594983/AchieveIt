import { ResultCommon } from "./common";

interface Function {
  function_id: number;
  function_name: string;
  project_id: string;
  layer: number;
}

export interface FunctionResult extends ResultCommon {
  function: Function;
}
