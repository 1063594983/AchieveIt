/**
 * @author: zou
 * @description: 和Config相关的RequestBody和ResponseResult格式
 * 组织配置管理员才能对其进行修改
 */
import { ResultCommon, Authorization } from "../common";

interface Config {
    config_id: number
    git_address: string,
    server_menu: string,
    vm_space: string,
    project_id: string
}

// requestBody

// get /config/:project_id
interface ConfigGetBody extends Authorization {

}

// post /config
// 配置库建立后，发送邮件给项目经理通知其进行人员权限设置
interface ConfigPostBody extends Authorization {
    git_address?: string,
    server_menu?: string,
    vm_space?: string,
    project_id: string
}

// put /config/:project_id
interface ConfigPutBody extends Authorization {
    git_address?: string,
    server_menu?: string,
    vm_space?: string
}

// delete /config/:project_id
interface ConfigDeleteBody extends Authorization {

}

// responseResult
export interface GetConfigResult extends ResultCommon {
    config?: Config
}