import { ResultCommon } from "./common";

interface Feature {
    function_id: number,
    function_name: string,
    project_id: string,
    layer: Int16Array
}

export interface FeatureResult extends ResultCommon{
    feature: Feature[]
}
