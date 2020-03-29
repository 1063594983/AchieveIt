/**
 * @author: zou
 * @description: 和Config相关的RequestBody和ResponseResult格式
 */
import { ResultCommon, Authorization } from "../common";

interface Config {
  config_id: number;
  git_address: string;
  server_menu: string;
  vm_space: string;
  project_id: string;
}

// requestBody

// get /config/:project_id
interface ConfigGetBody extends Authorization {}

// post /config
interface ConfigPostBody extends Authorization {
  git_address?: string;
  server_menu?: string;
  vm_space?: string;
  project_id: string;
}

// put /config/:project_id
interface ConfigPutBody extends Authorization {
  git_address?: string;
  server_menu?: string;
  vm_space?: string;
}

// delete /config/:project_id
interface ConfigDeleteBody extends Authorization {}

// responseResult
export interface GetConfigResult extends ResultCommon {
  config?: Config;
}
