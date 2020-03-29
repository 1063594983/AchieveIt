import { ResultCommon, Authorization } from "../common";

interface Device {
  device_id: number;
  device_name: string;
  device_status: string; // ['可用', '不可用']
}

// requestBody

// get /device/:device_id
export interface DeviceGetBody extends Authorization {}

// post /deivce
export interface DevicePostBody extends Authorization {
  device_name: string;
  device_status: 0 | 1;
}

// put /deivce/:device_id
export interface DevicePutBody extends Authorization {
  device_name: string;
  device_status: 0 | 1;
}

// delete /device/:device_id
export interface DeviceDeleteBody extends Authorization {}

// get /device/getProjectDeviceList/:project_id
export interface ProjectDeviceListGetBody extends Authorization {}

// post /deivce/applyDeviceForProject/:project_id
export interface ApplyDeviceForProjectPostBody extends Authorization {
  device_id: number,
  member_id: number,
  return_time: number
}

// responseResult
export interface GetDeviceResult extends ResultCommon {
  device: Device;
}

export interface GetProjectDeviceListResult extends ResultCommon {
  project_id: string,
  device_list: {
    device_id: number,
    device_name: string,
    member_id: number,
    return_time: string
  }[]
}
