import { ResultCommon } from "./common";

interface Device {
    device_id: Int16Array,
    device_name: string,
    device_status: string
}

export interface DeviceResult extends ResultCommon {
    device: Device
}