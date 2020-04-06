import {
  DeviceDeleteBody,
  DeviceGetBody,
  DevicePostBody,
  DevicePutBody,
  GetAllDeviceResult,
  GetDeviceResult
} from "achieve-it-contract";
import { createCRUD } from "@/agent/utils";
import { axiosGet } from '@/agent/utils';

const deviceAPI = {
  ...createCRUD<DeviceGetBody, DeviceDeleteBody, DevicePutBody, DevicePostBody, GetDeviceResult>('device'),
  getAll() {
    return axiosGet<GetAllDeviceResult>('device', 'getAllDevices');
  },
};

export default deviceAPI;
