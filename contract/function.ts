import { ResultCommon } from "./common";

interface Function {
    function_id: Int16Array,
    function_name: string,
    project_id: string,
    layer: Int16Array
}

export interface FunctionResult extends ResultCommon{
    function: Function
}
