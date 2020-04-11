/**
 * @author: zou
 * @description: 和defect相关api的格式规定
 */

import { Authorization, ResultCommon } from "..";

 export interface Defect {
     defect_id: string,
     project_id: string,
     defect_content: string,
     status: string // ['待解决', '已解决']
 }


 /**
  * api: get /defect/getProjectDefectList/:project_id
  */

// request
export interface ProjectDefectListGetBody extends Authorization {}

// result
export interface GetProjectDefectListResult extends ResultCommon {
  project_id: string,
  defect_list: Defect []
}

/**
 * api: get /defect/getAllDefect
 */

//  request
export interface AllDefectGetBody extends Authorization {}

// result
export interface GetAllDefectResult extends ResultCommon {
  defect_list: Defect []
}

/**
 * api: post /defect
 */

// request
export interface DefectPostBody extends Authorization {
  project_id: string,
  defect_content: string,
  status: 0   //  0 --> '未解决'
}

/**
 * api: put /defect/:defect_id
 */

//  request
export interface DefectPutBody extends Authorization {
  status: 1
}