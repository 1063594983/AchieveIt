import {
  DeviceDeleteBody,
  DeviceGetBody,
  DevicePostBody,
  DevicePutBody,
  GetDeviceResult,
  GetProjectFeatureListResult,
} from 'achieve-it-contract';
import { createCRUD } from '@/agent/index';
import { axiosGet, axiosPost } from "@/agent/utils";

const featureAPI = {
  getFeatureList: (projectId: string) =>
    axiosGet<GetProjectFeatureListResult>('function', `getProjectFunctionList/${projectId}`),
    // addFeature: (projectId: string, feature: ) => axiosPost('function', "addFunction")
};

export default featureAPI;
