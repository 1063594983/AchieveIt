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

}