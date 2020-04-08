import {
  DeviceDeleteBody,
  DeviceGetBody,
  DevicePostBody,
  DevicePutBody,
  GetAllDeviceResult,
  GetDeviceResult,
} from 'achieve-it-contract';
import { createCRUD } from '@/agent/utils';
import { axiosGet } from '@/agent/utils';
import { reactive, toRefs } from '@vue/composition-api';
import { Device } from 'achieve-it-contract/namespaces/device';

const deviceAPI = {
  ...createCRUD<DeviceGetBody, DeviceDeleteBody, DevicePutBody, DevicePostBody, GetDeviceResult>('device'),
  getAll() {
    return axiosGet<GetAllDeviceResult>('device', 'getAllDevices');
  },
};

function useDevice() {
  const state = reactive<{
    deviceList: Device[];
    isLoading: boolean;
  }>({
    deviceList: [],
    isLoading: false,
  });
  async function load() {
    state.isLoading = true;
    const result = await deviceAPI.getAll();
    state.deviceList = result.device_list;
    state.isLoading = false;
  }
  return { load, state };
}

export { useDevice };
export default deviceAPI;
