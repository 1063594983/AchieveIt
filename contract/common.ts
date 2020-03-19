export type StatusType = "error" | "ok";

export interface ResultCommon {
  msg: string; // 用来描述具体的信息，例如：用户名错误、用户权限不足、项目id错误等
  status: "error" | "ok"; // 只考虑错误或成功，其他具体信息在 msg 中表达
}


export interface Authorization {
  token: string
}