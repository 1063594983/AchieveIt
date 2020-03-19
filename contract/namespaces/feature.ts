import { ResultCommon } from "../common";

interface Feature {
  function_id: number;
  function_name: string;
  project_id: string;
  layer: number;
}

export interface GetFeatureResult extends ResultCommon {
  feature: Feature;
}

export interface GetFeatureListResult extends ResultCommon {
  featureList: Feature[];
}
