export interface ResultCommon {
  msg: string;
  status: "error" | "ok" | "not found" | string;
}
