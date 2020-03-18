export default {
    user: {
        checkUser: "select username, member_id from user where username = ? and password = ?"
    },
    member: {
        getMemberById: "select * from member where member_id = ?"
    }
}