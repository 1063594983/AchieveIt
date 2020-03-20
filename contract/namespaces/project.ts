import { ResultCommon, Authorization} from "../common";

interface Project {
  project_id: number;
  project_name: string;
  client_info: string;
  start_time: string;
  end_time: string;
  manager: number;
  important_events: string[];
  technology: string[];
  business: string;
  status: string; //  ['申请立项', '已立项', '立刻驳回', '进行中', '已交付', '结束', '已归档']
}

// requestBody
interface ProjectGetBody extends Authorization {

}

interface ProjectPutBBody extends Authorization {
    project_name?: string,
    client_info?: string,
    start_time?: string,
    end_time?: string,
    manager?: number,
    important_events?: Array<string>,
    technology?: Array<string>,
    business?: string,
    status?: 0 | 1 | 2 | 3 | 4 | 5 | 6 
}

interface ProjectPostBBody extends Authorization {
    project_id: string,
    project_name?: string,
    client_info?: string,
    start_time?: string,
    end_time?: string,
    manager?: number,
    important_events?: Array<string>,
    technology?: Array<string>,
    business?: string,
    status: 0 | 1 | 2 | 3 | 4 | 5 | 6 
}

interface ProjectDeleteBody extends Authorization {

}

// responseResult
export interface GetProjectResult extends ResultCommon {
  project: Project;
}
