import { ConfigDeleteBody, ConfigGetBody, ConfigPostBody, ConfigPutBody, GetConfigResult, ConfigList } from 'achieve-it-contract';
import { axiosGet, baseURL} from '@/agent/utils';
import { createCRUD } from "@/agent/utils";
import { wrapToken } from "@/agent/index";
import axios from 'axios';

const configAPI = {
    ...createCRUD<ConfigGetBody, ConfigDeleteBody, ConfigPutBody, ConfigPostBody, GetConfigResult>('config'),
    getAll: async () => {
        const result = await axios.get(`${baseURL}/config/getAllConfigs`);
        return result;
    },
    ofProject: async (project_id) => {
      const result = await axios.get(`${baseURL}/config/${project_id}`);
      return result.data;
    },
    postConfig: async (form) => {
        const result = await axios.post(`${baseURL}/config`, {
          project_id: form.project_id,
          git_address: form.git_address,
          server_menu: form.server_menu,
          vm_space: form.vm_space
        })
        return result;
      },
      putConfig: async (form) => {
        const result = await axios.put(`${baseURL}/config/` + form.project_id, {
          git_address: form.git_address,
          server_menu: form.server_menu,
          vm_space: form.vm_space
        })
        return result;
      },
  };

export default configAPI;
