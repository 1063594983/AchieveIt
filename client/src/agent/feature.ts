import { GetProjectFeatureListResult } from "achieve-it-contract";
import { axiosGet } from "@/agent/utils";
import axios from 'axios';

const featureAPI = {
  getFeatureList: (projectId: string) =>
    axiosGet<GetProjectFeatureListResult>('function', `getProjectFunctionList/${projectId}`),
  // addFeature: (projectId: string, feature: ) => axiosPost('function', "addFunction")
  uploadFeatureExcel: async (projectId: string, fileData) => {
    const result = await axios.post(`http://localhost:3000/function/importFunctionExcelToProject/${projectId}`, fileData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return result;
  },
  downloadFeatureExcel: async (projectId: string) => {
    // const result = await axios.get(`http://localhost:3000/function/getProjectFunctionExcel/${projectId}`);
    // return result;
    const result = await axios.post(`http://localhost:3000/function/getProjectFunctionExcel/${projectId}`, {
      responseType: 'blob'
    })
    if (result.data.status == 'error') {
      return result;
    }
    const fileUrl = `http://localhost:3000/feature/${projectId}.xls`;

    // let blob = new Blob([fileData], { type: "application/vnd.ms-excel;charset=utf8"});
    let downloadElement = document.createElement("a");
    // let href = window.URL.createObjectURL(fileUrl); //创建下载的链接
    downloadElement.href = fileUrl;
    const name = `${projectId}.xls`;
    downloadElement.download = name; //下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); //点击下载
    document.body.removeChild(downloadElement); //下载完成移除元素
    // window.URL.revokeObjectURL(href); //释放掉blob对象
    return result;
  }
};

export default featureAPI;
