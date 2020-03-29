/**
 * @author: zou
 * @description: worktime相关的api定义
 */

 
import config from "../config";
import express, { Response } from "express";
import $sql from "./sqlMap";
import { ResultCommon, getWorkTimeResult } from "achieve-it-contract";
import { mysqlErrorHandler, notFoundErrorHandler, commomUpdateHandler, commomInsertHandler, commonDeleteHandler } from "../util";
import { conn } from '../mysqlPool';

const router = express.Router();

// get /workTime/:work_time_id
router.get("/:work_time_id", (req, res: Response<getWorkTimeResult>) => {
    const work_time_id = req.params.work_time_id;
    conn.query($sql.workTime.getWorkTimeById, [work_time_id], (err, result) => {
        if (err) {
            mysqlErrorHandler(res, err);
        } else if (result.length == 1) {
            res.json({
                work_time: result[0],
                status: config.status.SUCCESS,
                msg: "get success"
            })
        } else {
            notFoundErrorHandler(res);
        }
    })
})

// post /workTime
router.post("/", (req, res: Response<ResultCommon>) => {
    const details = req.body;
    conn.query($sql.workTime.insertWorkTime, [details.member_id, details.function_id, details.activity_content, details.project_id, 
        details.start_time, details.end_time], (err) => {
            commomInsertHandler(res, err);
    })
})

// put /workTime/:work_time_id
router.put("/:work_time_id", (req, res: Response<ResultCommon>) => {
    const work_time_id = req.params.work_time_id;
    const details = req.body;
    conn.query($sql.workTime.getWorkTimeById, [work_time_id], (err, result) => {
        if (err) {
            mysqlErrorHandler(res, err);
        } else if (result.length == 1) {
            const old = result[0];
            conn.query($sql.workTime.updateWorkTimeById, [details.member_id || old.member_id, details.function_id || old.function_id, 
                details.activity_content || old.activity_content, details.project_id || old.project_id, 
                details.start_time || old.start_time, details.end_time || old.end_time, work_time_id], (err2) => {
                commomUpdateHandler(res, err2);
            })
        } else {
            notFoundErrorHandler(res);
        }
    })
})

// delete /workTime/:work_time_id
router.delete("/:work_time_id", (req, res: Response<ResultCommon>) => {
    const work_time_id = req.params.work_time_id;
    conn.query($sql.workTime.deleteWorkTimeById, [work_time_id], (err) => {
        commonDeleteHandler(res, err);
    })
})

export default router;