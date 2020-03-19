import { StatusType } from "achieve-it-contract";

const config: { [key: string]: any; status: { [key: string]: StatusType } } = {
  mysql: {
    host: "rm-bp1r8386h2f0n9713jo.mysql.rds.aliyuncs.com",
    user: "zou",
    password: "Zouzou123",
    database: "achieveit",
    port: "3306"
  },
  jwt: {
    signKey: "achieveit_project_sign_key"
  },
  status: {
    NOT_FOUND: "not found",
    SUCCESS: "ok",
    ERROR: "error"
  },
  msg: {
    GET_MEMBER: "success",
    UPDATE_MEMBER: "success"
  }
};

export default config;
