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
    device: {
        getDeviceById: "select * from device where device_id = ?",
        updateDeviceById: "update device set device_name = ?, device_status = ? where device_id = ?",
        insertDevice: "insert into device (device_name, device_status) values (?, ?)",
        deleteDeviceById: "delete from device where device_id = ?"

    }
}