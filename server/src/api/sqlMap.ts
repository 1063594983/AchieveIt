/**
 * @author: zou
 * @description: sql语句字符串模板
 */
interface SelectOption {
  select_col?: string;
  table_name: string;
  key_name: string;
}

interface InsertOption {
  table_name: string;
  select_col: string;
}

interface DeleteOption {
  table_name: string;
  key_name: string;
}

interface UpdateOption {
  table_name: string;
  key_name: string;
  select_col: string;
}

const pattern = {
  selectPattern: (option: SelectOption) => {
    return `select ${option.select_col || '*'} from ${option.table_name} where ${option.key_name} = ?`;
  },
  insertPattern: (option: InsertOption) => {
    const col_count = option.select_col.split(',').length;
    
    return `insert into ${option.table_name} (${option.select_col}) values (${Array.from(
      { length: col_count },
      () => '?'
    ).join()})`;
  },
  deletePattern: (option: DeleteOption) => {
    return `delete from ${option.table_name} where ${option.key_name} = ?`;
  },
  updatePattern: (option: UpdateOption) => {
    return `update ${option.table_name} set ${option.select_col
      .split(',')
      .map(x => (x += '=?'))
      .join()} where ${option.key_name} = ?`;
  }
};

export default {
  user: {
    checkUser: 'select a.username, a.member_id, b.job from user a inner join member b on a.member_id = b.member_id  where a.username = ? and a.password = ?',
    insertUser: 'insert into user (username, password, member_id) values (?, ?, ?)',
    deleteUser: 'delete from user where member_id = ?'
  },
  member: {
    getAllMembers: "select * from member",
    getMemberById: pattern.selectPattern({
      table_name: 'member',
      key_name: 'member_id'
    }),
    // updateMemberById: "update member set member_name = ?, email = ?, department = ?, leader_email = ?, phone = ?, job = ? where member_id = ?",
    updateMemberById: pattern.updatePattern({
      table_name: 'member',
      select_col: 'member_name, email, department, leader_email, phone, job',
      key_name: 'member_id'
    }),
    insertMember: pattern.insertPattern({
      table_name: 'member',
      select_col: 'member_name, email, department, leader_email, phone, job'
    }),
    deleteMemberById: pattern.deletePattern({
      table_name: 'member',
      key_name: 'member_id'
    }),
    getMemberRole: "select * from member_project where project_id = ? and member_id = ?",
    changeMemberRole: "update member_project set role = ?, authority = ? where project_id = ? and member_id = ?",
    addMemberToProject: pattern.insertPattern({
      table_name: 'member_project',
      select_col: "project_id, member_id, role, authority"
    })
  },
  function: {
    getFunctionByProjectId: pattern.selectPattern({ table_name: '`function`', key_name: 'function_id' }),
    insertFunction: pattern.insertPattern({ table_name: '`function`', select_col: 'function_name, project_id, layer' }),
    setFunctionRelation: 'insert into function_function (first_function_id, second_function_id) values (?, ?)'
  },

  project: {
    getProjectById: 'select * from project where project_id = ?',
    deleteProjectById: 'delete from project where project_id = ?',
    insertProject:
      'insert into project (project_id, project_name, client_info, start_time, end_time, manager, important_events, technology, business, status) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    updateProjectById: `update project set project_name = ?, client_info = ?, start_time = ?, end_time = ?, manager = ?, important_events = ?, technology = ?,
            business = ?, status = ? where project_id = ?`,
    updateProjectStatus: pattern.updatePattern({
      table_name: 'project',
      select_col: 'status',
      key_name: 'project_id'
    }),
    getAllProjects: 'select * from project',
  },
  /**
   * @author: zou
   */
  device: {
    getDeviceById: 'select * from device where device_id = ?',
    getAllDevices: 'select * from device',
    updateDeviceById: 'update device set device_name = ?, device_status = ? where device_id = ?',
    insertDevice: 'insert into device (device_name, device_status) values (?, ?)',
    deleteDeviceById: 'delete from device where device_id = ?',
    getProjectDeviceList: 'SELECT a.device_id, a.member_id, a.return_time, b.device_name FROM project_device a inner join device b on a.device_id = b.device_id where a.project_id = ?',
    applyDeviceForProject: 'call applyDeviceForProject(?, ?, ?, ?)'
  },
  /**
   * @author: zou
   */
  activity: {
    getActivityById: 'select * from activity where activity_id = ?',
    deleteActivityById: 'delete from activity where activity_id = ?',
    updateActivityById: 'update activity set activity_name = ?, activity_content = ? where activity_id = ?',
    insertActivity: 'insert into activity (activity_name, activity_content) values (?, ?)'
  },
  /**
   * @author: zou
   */
  risk: {
    getRiskById: 'select * from risk where risk_id = ?',
    insertRisk: 'insert into risk (detail, project_id, solve_status) values (?, ?, ?)',
    updateRiskById: 'update risk set detail = ?, solve_status = ? where risk_id = ?',
    deleteRiskById: 'delete from risk where risk_id = ?',
    getProjectRiskList: 'select * from risk where project_id = ?'
  },
  /**
   * @author: zou
   */
  config: {
    getConfigByProjectId: pattern.selectPattern({
      table_name: "config",
      key_name: "project_id"
    }),
    insertConfig: pattern.insertPattern({
      table_name: "config",
      select_col: "git_address, server_menu, vm_space, project_id"
    }),
    updateConfigByProjectId: pattern.updatePattern({
      table_name: "config",
      select_col: "git_address, server_menu, vm_space",
      key_name: "project_id"
    }),
    deleteConfigByProjectId: pattern.deletePattern({
      table_name: "config",
      key_name: "project_id"
    })
  },
  /**
   * @author: zou
   */
  workTime: {
    getMemberWorkTimeList: pattern.selectPattern({
      table_name: 'work_time',
      key_name: 'member_id'
    }),
    insertWorkTime: pattern.insertPattern({
      table_name: 'work_time',
      select_col: 'member_id, function_id, activity_content, project_id, start_time, end_time'
    })
  },
  feature: {
    insertFeatureExcel: pattern.insertPattern({
      table_name: 'feature',
      select_col: 'project_id, excel_id'
    })
  }
};
