export type StatusType = "error" | "ok" | "not found";

export interface ResultCommon {
  msg: string;
  status: "error" | "ok" | "not found";
}
