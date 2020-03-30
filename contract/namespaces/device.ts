import { ResultCommon, Authorization } from "../common";

interface Device {
  device_id: number;
  device_name: string;
  device_status: string; // ['可用', '不可用']
}

/**
 * api: get /device/:device_id
 */

// request
export interface DeviceGetBody extends Authorization {}

// result
export interface GetDeviceResult extends ResultCommon {
  device: Device;
}


/**
 * api: get /device/getProjectDeviceList/:project_id
 */

//  request
export interface ProjectDeviceListGetBody extends Authorization {}

// result
export interface GetProjectDeviceListResult extends ResultCommon {
  project_id: string,
  device_list: {
    device_id: number,
    device_name: string,
    member_id: number,
    return_time: string
  }[]
}


/**
 * api: post /device
 */

// request
export interface DevicePostBody extends Authorization {
  device_name: string;
  device_status: 0 | 1;
}


/**
 * api: post /deivce/applyDeviceForProject/:project_id
 */

//  request
export interface ApplyDeviceForProjectPostBody extends Authorization {
  device_id: number,
  member_id: number,
  return_time: number
}


/**
 * api: put /device/:device_id
 */

// request
export interface DevicePutBody extends Authorization {
  device_name: string;
  device_status: 0 | 1;
}


/**
 * api: delete /device/:device_id
 */

// request
export interface DeviceDeleteBody extends Authorization {}





