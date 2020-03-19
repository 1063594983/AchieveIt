import { ResultCommon, Authorization} from "../common";

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

// requestBody
interface ProjectGetBody extends Authorization {

}

interface ProjectPutBBody extends Authorization {
    project_name?: string,
    client_info?: string,
    start_time?: string,
    end_time?: string,
    manager?: string,
    important_events?: Array<string>,
    technology?: Array<string>,
    business?: string,
    status?: string
}

interface ProjectPostBBody extends Authorization {
    project_id: string,
    project_name?: string,
    client_info?: string,
    start_time?: string,
    end_time?: string,
    manager?: string,
    important_events?: Array<string>,
    technology?: Array<string>,
    business?: string,
    status?: string
}

interface ProjectDeleteBody extends Authorization {

}

// responseResult
export interface GetProjectResult extends ResultCommon {
  project: Project;
}
