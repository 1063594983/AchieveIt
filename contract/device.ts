import { ResultCommon } from "./common";

interface Device {
  device_id: number;
  device_name: string;
  device_status: string;
}

export interface DeviceResult extends ResultCommon {
  device?: Device;
}
