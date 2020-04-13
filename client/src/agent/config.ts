import { ConfigDeleteBody, ConfigGetBody, ConfigPostBody, ConfigPutBody, GetConfigResult } from 'achieve-it-contract';
import { createCRUD, baseURL } from "@/agent/utils";
import axios from 'axios';

// const configAPI = createCRUD<ConfigGetBody, ConfigDeleteBody, ConfigPutBody, ConfigPostBody, GetConfigResult>('config');

const configAPI = {
    get: async (project_id: string) => {
        const result = await axios.get(`${baseURL}/config/${project_id}`);
        return result.data;
    }
}
export default configAPI;
