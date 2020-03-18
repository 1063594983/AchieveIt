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
    project: {
        getProjectById: "select * from project where project_id = ?",
        deleteProjectById: 'delete from project where project_id = ?',
        insertProject: 'insert into project (project_id, project_name, client_info, start_time, end_time, manager, important_events, technology, business, status) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    }
}