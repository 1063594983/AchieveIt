import { DeviceDeleteBody, DeviceGetBody, DevicePostBody, DevicePutBody, GetDeviceResult } from "achieve-it-contract";
import { createCRUD } from "@/agent/index";

const deviceAPI = createCRUD<DeviceGetBody, DeviceDeleteBody, DevicePutBody, DevicePostBody, GetDeviceResult>('device');

export default deviceAPI
