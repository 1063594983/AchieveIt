import {
  ActivityDeleteBody,
  ActivityGetBody,
  ActivityPostBody,
  ActivityPutBody,
  GetActivityResult
} from "achieve-it-contract";
import { createCRUD } from "@/agent/index";

const activityAPI = createCRUD<ActivityGetBody, ActivityDeleteBody, ActivityPutBody, ActivityPostBody, GetActivityResult>(
  'activity'
);

export default activityAPI;
