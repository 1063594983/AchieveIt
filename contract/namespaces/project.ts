import { ResultCommon } from "../common";

interface Project {
  project_id: number;
  project_name: string;
  client_info: string;
  start_time: string;
  end_time: string;
  manager: string;
  important_events: string[];
  technology: string[];
  business: string;
  status: string;
}

export interface GetProjectResult extends ResultCommon {
  project: Project;
}
