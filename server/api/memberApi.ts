
import config from "../config";
import express, { Response } from "express";
import mysql from "mysql";
import $sql from "./sqlMap";
import { GetMemberResult, ResultCommon } from "achieve-it-contract";
import { commonDeleteHandler, commomInsertHandler, mysqlErrorHandler, commomUpdateHandler, notFoundErrorHandler } from "../util";
import { conn } from '../mysqlPool';
const router = express.Router();

// get /member/:member_id
// getMember

router.get("/:member_id", (req, res: Response<GetMemberResult>) => {
    const member_id = req.params.member_id;
    conn.query($sql.member.getMemberById, [member_id], (err, result) => {
        if (err) {
            mysqlErrorHandler(res, err);
        } else if (result.length == 1) {
            result[0].job = config.numberMap.memberJob[result[0].job];
            res.json({
                member: result[0],
                status: config.status.SUCCESS,
                msg: config.msg.GET_MEMBER
            });
        } else {
            notFoundErrorHandler(res);
        }
    })
});


// put /member/:member_id
// updateMember
router.put("/:member_id", (req, res: Response<ResultCommon>) => {
    const member_details = req.body;
    const member_id = req.params.member_id;

    conn.query($sql.member.getMemberById, [member_id], (err, result) => {
        if (err) {
            mysqlErrorHandler(res, err);
        } else if (result.length == 1) {
            const old_member = result[0];
            conn.query(
                $sql.member.updateMemberById,
                [
                    member_details.member_name || old_member.member_name,
                    member_details.email || old_member.email,
                    member_details.department || old_member.department,
                    member_details.leader_email || old_member.leader_email,
                    member_details.phone || old_member.phone,
                    member_details.job || old_member.job,
                    member_id
                ],
                (err2) => {
                    commomUpdateHandler(res, err2);
                }
            );
        } else {
            notFoundErrorHandler(res);
        }
    });
});

// post /memner
// insertMember
router.post("/", (req, res: Response<ResultCommon>) => {
    const member_details = req.body;
    conn.query(
        $sql.member.insertMember,
        [
            member_details.member_name || "",
            member_details.email || "",
            member_details.department || "",
            member_details.leader_email || "",
            member_details.phone || "",
            member_details.job || ""
        ],
        (err, result) => {
            if (err) {
                mysqlErrorHandler(res, err);
            } else {
                conn.query(
                    $sql.user.insertUser,
                    [
                        member_details.username || result.insertId,
                        member_details.password || result.insertId,
                        result.insertId
                    ],
                    (err2) => {
                        commomInsertHandler(res, err2);
                    }
                );
            }
        }
    );
});

// delete /member/:member_id
// unfinished: 未实现级联删除
router.delete("/:member_id", (req, res: Response<ResultCommon>) => {
    const member_id = req.params.member_id;
    conn.query($sql.member.deleteMemberById, [member_id], (err) => {
        commonDeleteHandler(res, err);
    });
});

export default router;
