import { ResultCommon, Authorization } from "../common";

interface Device {
  device_id: number;
  device_name: string;
  device_status: string; // ['可用', '不可用']
}

// requestBody
export interface DeviceGetBody extends Authorization {}

export interface DevicePostBody extends Authorization {
  device_name: string;
  device_status: 0 | 1;
}

export interface DevicePutBody extends Authorization {
  device_name: string;
  device_status: 0 | 1;
}

export interface DeviceDeleteBody extends Authorization {}

// responseResult
export interface GetDeviceResult extends ResultCommon {
  device: Device;
}
