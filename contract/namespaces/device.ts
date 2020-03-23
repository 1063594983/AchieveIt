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

// get /device/getProjectDeviceList/:project_id
interface ProjectDeviceListGetBody extends Authorization {

}

// put /deivce/:device_id
export interface DevicePutBody extends Authorization {
  device_name: string;
  device_status: 0 | 1;
}

// delete /device/:device_id
export interface DeviceDeleteBody extends Authorization {}


// responseResult
export interface GetDeviceResult extends ResultCommon {
  device: Device;
}

export interface GetProjectDeviceListResult extends ResultCommon {
  device_list: {
    device_id: number,
    device_name: string
  } []
}
