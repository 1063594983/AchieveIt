/**
 * @author: zou
 * @description: 和Config相关的RequestBody和ResponseResult格式
 * 组织配置管理员才能对其进行修改
 */
import { ResultCommon, Authorization } from "../common";

export interface Config {
  config_id: number;
  git_address: string;
  server_menu: string;
  vm_space: string;
  project_id: string;
}


/**
 * api: get /config/getAllConfigs
 */

// request
export interface ConfigListGetBody extends Authorization{}

// response
export interface ConfigList extends ResultCommon {
  config_list: Config []
}

/**
 * api: get /config/:project_id
 */

// request
export interface ConfigGetBody extends Authorization {}

// result
export interface GetConfigResult extends ResultCommon {
  config?: Config;
}


/**
 * api: post /config
 * description: 组织级配置管理员建立配置库后，发送邮件给项目经理通知其进行人员权限设置(由后端完成)
 */

// request
export interface ConfigPostBody extends Authorization {
  git_address?: string;
  server_menu?: string;
  vm_space?: string;
  project_id: string;
}


/**
 * api: put /config/:project_id
 */
// request
export interface ConfigPutBody extends Authorization {
  git_address?: string;
  server_menu?: string;
  vm_space?: string;
}


/**
 * api: delete /config/:project_id
 */
// request
export interface ConfigDeleteBody extends Authorization {}

