import { ResultCommon, Authorization } from "../common";

interface Feature {
  /**
   * layer = 1 --> function_id = `${project_id}_${function_name}`  
   * layer = 2 --> function_id = `${project_id}_${parent.function_name}_${function_name}`
   * 因此project_id和function_name中不能有下划线
   * 
   * 只有子功能有parent
   */
  function_id: string;  // 
  function_name: string;
  project_id: string;
  layer: 1 | 2; // 2是子功能,
  parent?: string
}

// get /function/getProjectFunctionList/:project_id
// requestBody
export interface GetProjectFunctionListGetBody extends Authorization {

}

// post /function/addFunctionToProject/:project_id
export interface AddFunctionToProject extends Authorization {
  function_name: string,
  layer: 1 | 2
}

interface FunctionExcelItem {
  parent: {
    function_name: string
  },
  children: {
    function_name: string
  } []
}

// post /function/importFunctionExcelToProject/:project_id
export interface ImportFunctionExcelToProject extends Authorization {
  function_excel: FunctionExcelItem []
}

export interface GetFeatureResult extends ResultCommon {
  feature: Feature;
}

export interface GetProjectFeatureListResult extends ResultCommon {
  feature_list: Feature[];
  project_id: string
}
