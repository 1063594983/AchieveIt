export default {
    user: {
        checkUser: "select username, member_id from user where username = ? and password = ?",
        insertUser: "insert into user (username, password, member_id) values (?, ?, ?)",
        deleteUser: 'delete from user where member_id = ?'
    },
    member: {
        getMemberById: "select * from member where member_id = ?",
        updateMemberById: "update member set member_name = ?, email = ?, department = ?, leader_email = ?, phone = ?, job = ? where member_id = ?",
        insertMember: "insert into member (member_name, email, department, leader_email, phone, job) values (?, ?, ?, ?, ?, ?)",
        deleteMemberById: "delete from member where member_id = ?"
    },
    function: {
        getFunctionByProjectId: "select * from function where project_id = ?",
        insertFunction: "insert into function (function_name, project_id, layer) values (?, ?, ?)",
        setFunctionRelation: "insert into function_function (first_function_id, second_function_id) values (?, ?)"
    },

    project: {
        getProjectById: "select * from project where project_id = ?",
        deleteProjectById: 'delete from project where project_id = ?',
        insertProject: 'insert into project (project_id, project_name, client_info, start_time, end_time, manager, important_events, technology, business, status) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        updateProjectById: `update project set project_name = ?, client_info = ?, start_time = ?, end_time = ?, manager = ?, important_events = ?, technology = ?,
            business = ?, status = ? where project_id = ?`
    },
    /**
     * @author: zou
     */
    device: {
        getDeviceById: "select * from device where device_id = ?",
        updateDeviceById: "update device set device_name = ?, device_status = ? where device_id = ?",
        insertDevice: "insert into device (device_name, device_status) values (?, ?)",
        deleteDeviceById: "delete from device where device_id = ?"

    },
    /**
     * @author: zou
     */
    activity: {
        getActivityById: "select * from activity where activity_id = ?",
        deleteActivityById: "delete from activity where activity_id = ?",
        updateActivityById: "update activity set activity_name = ?, activity_content = ? where activity_id = ?",
        insertActivity: "insert into activity (activity_name, activity_content) values (?, ?)"
    },
    /**
     * @author: zou
     */
    risk: {
        getRiskById: "select * from risk where risk_id = ?",
        insertRisk: "insert into risk (detail, project_id, solve_status) values (?, ?, ?)",
        updateRiskById: "update risk set detail = ?, solve_status = ? where risk_id = ?",
        deleteRiskById: "delete from risk where risk_id = ?",
        getProjectRiskList: "select * from risk where project_id = ?"
    }
}