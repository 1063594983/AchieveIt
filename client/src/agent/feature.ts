import { GetProjectFeatureListResult } from "achieve-it-contract";
import { axiosGet } from "@/agent/utils";

const featureAPI = {
  getFeatureList: (projectId: string) =>
    axiosGet<GetProjectFeatureListResult>('function', `getProjectFunctionList/${projectId}`),
    // addFeature: (projectId: string, feature: ) => axiosPost('function', "addFunction")
};

export default featureAPI;
