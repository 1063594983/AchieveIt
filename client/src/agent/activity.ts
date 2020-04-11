import {
  ActivityDeleteBody,
  ActivityGetBody,
  ActivityPostBody,
  ActivityPutBody,
  GetActivityResult
} from "achieve-it-contract";
import { createCRUD, baseURL } from "@/agent/utils";
import axios from 'axios';

const activityCRUD = createCRUD<ActivityGetBody, ActivityDeleteBody, ActivityPutBody, ActivityPostBody, GetActivityResult>(
  'activity'
);

const activityAPI = {
  ...activityCRUD,
  ofProject: async (project_id: string) => {
    const result = await axios.get(`${baseURL}/activity/getProjectActivityList/${project_id}`);
    return result;
  },
  getAll: async () => {
    const result = await axios.get(`${baseURL}/activity/getAllActivitys`);
    return result;
  }
}

export default activityAPI;
