import { ResultCommon, Authorization } from "./common";

interface Device {
    device_id: number,
    device_name: string,
    device_status: string   // ['可用', '不可用']
}

// requestBody
interface DeviceGetBody extends Authorization {

}

interface DevicePostBody extends Authorization {
    device_name: string,
    device_status: string
}

interface DevicePutBody extends Authorization {
    device_name: string,
    device_status: string
}

interface DeviceDeleteBody extends Authorization {

}


// responseResult
export interface DeviceGetResult extends ResultCommon {
    device?: Device
}