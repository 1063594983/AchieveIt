import { StatusType } from "achieve-it-contract";

const config: { [key: string]: any; status: { [key: string]: StatusType } } = {
  mysql: {
    host: "rm-bp1r8386h2f0n9713jo.mysql.rds.aliyuncs.com",
    user: "zou",
    password: "Zouzou123",
    database: "achieveit",
    port: "3306"
  },
  mysqlPool: {
    host: "rm-bp1r8386h2f0n9713jo.mysql.rds.aliyuncs.com",
    user: "zou",
    password: "Zouzou123",
    database: "achieveit",
    port: "3306",
    connectionLimit: 10
  },
  jwt: {
    signKey: "achieveit_project_sign_key"
  },
  status: {
    SUCCESS: "ok",
    ERROR: "error"
  },
  msg: {
    GET_MEMBER: "success",
    UPDATE_MEMBER: "success"
  },
  numberMap: {
    deviceStatus: ["可用", "不可用"],
    memberJob: ['项目经理', '项目上级', '组织级配置管理员', 'EPG Leader', 'QA Manager', '普通员工'],
    projectStatus: ['申请立项', '已立项', '立刻驳回', '进行中', '已交付', '结束', '已归档'],
    activityName: [
      {
        prefix: "工程活动",
        activityList: ["需求开发", "设计", "编码", "单体测试", "集成测试", "系统测试", "交付", "维护"]
      },
      {
        prefix: "管理活动",
        activityList: ["范围管理", "计划与调整", "监控与分析", "联络与沟通"]
      },
      {
        prefix: "外包活动",
        activityList: ["外包管理", "外包验收", "外包支持"]
      },
      {
        prefix: "支持活动",
        activityList: ["配置管理", "QA 审计", "会议报告总结", "培训", "其他"]
      }
    ],
    riskStatus: ['未处理', '正在跟进', '已解决'],
    memberRoleInProject: ["开发 Leader", "测试 Leader", "开发人员", "测试人员", "配置管理人员", "QA", "EPG"]
  }
};

export default config;
