import { ResultCommon } from "./common";

interface Project {
  project_id: number;
  project_name: string;
  client_info: string;
  start_time: string;
  end_time: string;
  manager: string;
  important_events: Array<string>;
  technology: Array<string>;
  business: string;
  status: string;
}

export interface ProjectResult extends ResultCommon {
  project: Project;
}
