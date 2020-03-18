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
    device: {
        getDeviceById: "select * from device where device_id = ?",
        updateDeviceById: "update device set device_name = ?, device_status = ? where device_id = ?",
        insertDevice: "insert into device (device_name, device_status) values (?, ?)",
        deleteDeviceById: "delete from device where device_id = ?"
    }
}