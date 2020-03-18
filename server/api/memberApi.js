import config from '../config'
import express from 'express'
import mysql from 'mysql'
import $sql from './sqlMap'

const router = express.Router();

// 连接数据库
const conn = mysql.createConnection(config.mysql);
conn.connect();

// get /member/:member_id
// getMember
router.get("/:member_id", (req, res) => {
    const member_id = req.params.member_id;
    conn.query($sql.member.getMemberById, [member_id], (err, result) => {
        if (err) {
            res.json({
                status: config.status.ERROR,
                msg: "error"
            })
        } else if (result.length == 1) {
            res.json({
                member: result[0],
                status: config.status.SUCCESS
            });
        } else {
            res.json({
                status: config.status.NOT_FOUND,
                msg: `未找到member_id为${member_id}的member`
            })
        }
    })
})

// put /member/:member_id
// updateMember
router.put("/:member_id", (req, res) => {
    const member_details = req.body;
    const member_id = req.params.member_id;

    conn.query($sql.member.getMemberById, [member_id], (err, result) => {
        if (err) {
            res.json({
                status: config.status.ERROR,
                msg: "error"
            })
        } else if (result.length == 1) {
            const old_member = result[0];
            conn.query($sql.member.updateMemberById, 
                [member_details.member_name || old_member.member_name, 
                member_details.email || old_member.email, 
                member_details.department || old_member.department,
                member_details.leader_email || old_member.leader_email,
                member_details.phone || old_member.phone,
                member_details.job || old_member.job, member_id], (err2, result2) => {
                    if (err2) {
                        res.json({
                            status: config.status.ERROR,
                            msg: `更新member_id为${member_id}的member失败`
                        })
                    } else {
                        res.json({
                            status: "ok"
                        })
                    }
                })
        } else {
            res.json({
                status: "not found",
                msg: `未找到member_id为${member_id}的member`
            })
        }
    })
})


// post /memner
// insertMember
router.post("/", (req, res) => {
    const member_details = req.body;
    conn.query($sql.member.insertMember, [member_details.member_name || "", member_details.email || "", member_details.department || "", 
        member_details.leader_email || "", member_details.phone || "", member_details.job || ""],
        (err, result) => {
            if (err) {
                res.json({
                    status: 'error',
                    msg: '添加员工失败'
                })
            } else {
                conn.query($sql.user.insertUser, [member_details.username || result.insertId, member_details.password || result.insertId, result.insertId], (err2, result2) => {
                    if (err2) {
                        res.json({
                            status: 'error',
                            msg: 'error'
                        })
                    } else {
                        res.json({
                            status: 'success'
                        })
                    }
                })
            }
        })
})

// delete /member/:member_id
// unfinished: 未实现级联删除
router.delete("/:member_id", (req, res) => {
    const member_id = req.params.member_id;
    conn.query($sql.member.deleteMemberById, [member_id], (err, result) => {
        if (err) {
            res.json({
                status: 'error',
                msg: 'error'
            })
        } else {

            res.json({
                status: 'ok',
                msg: 'member删除成功'
            })
        }
    })
})


export default router;