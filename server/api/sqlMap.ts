


/**
 * @author: zou
 * @description: sql语句字符串模板
 */
interface SelectOption {
    select_col?: string,
    table_name: string,
    key_name: string
}

interface InsertOption {
    table_name: string,
    select_col: string
}

interface DeleteOption {
    table_name: string,
    key_name: string
}

interface UpdateOption {
    table_name: string,
    key_name: string,
    select_col: string
}

const pattern = {
    selectPattern: (option: SelectOption) => {
        return `select ${option.select_col || "*"} from ${option.table_name} where ${option.key_name} = ?`
    },
    insertPattern: (option: InsertOption) => {
        const col_count = option.select_col.split(",").length;
        return `insert into ${option.table_name} (${option.select_col}) values (${Array.from({length: col_count}, () => "?").join()})`
    },
    deletePattern: (option: DeleteOption) => {
        return `delete from ${option.table_name} where ${option.key_name} = ?`
    },
    updatePattern: (option: UpdateOption) => {
        return `update ${option.table_name} set ${option.select_col.split(",").map(x=>x+="=?").join()} where ${option.key_name} = ?`
    }
}

export default {
    user: {
        checkUser: "select username, member_id from user where username = ? and password = ?",
        insertUser: "insert into user (username, password, member_id) values (?, ?, ?)",
        deleteUser: 'delete from user where member_id = ?'
    },
    member: {
        getMemberById: pattern.selectPattern({
            table_name: "member", 
            key_name: "member_id"
        }),
        // updateMemberById: "update member set member_name = ?, email = ?, department = ?, leader_email = ?, phone = ?, job = ? where member_id = ?",
        updateMemberById: pattern.updatePattern({
            table_name: "member",
            select_col: "member_name, email, department, leader_email, phone, job",
            key_name: "member_id"
        }),
        insertMember: pattern.insertPattern({
            table_name: "member", 
            select_col: "member_name, email, department, leader_email, phone, job"
        }),
        deleteMemberById: pattern.deletePattern({
            table_name: "member",
            key_name: "member_id"
        })
    },
    function: {
        // getFunctionByProjectId: "select * from function where project_id = ?",
        getFunctionByProjectId: pattern.selectPattern({table_name: "function", key_name: "function_id"}),
        // insertFunction: "insert into function (function_name, project_id, layer) values (?, ?, ?)",
        insertFunction: pattern.insertPattern({table_name: "function", select_col: "function_name, project_id, layer"}),
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
    },
    /**
     * @author: zou
     */
    config: {
        getConfigById: "select * from config"
    }
}