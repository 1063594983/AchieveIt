/**
 * @author: zou
 * @description: activity相关的api定义
 */

import config from "../config";
import express, { Response, response } from "express";
import mysql from "mysql";
import $sql from './sqlMap'
import { GetActivityResult, ResultCommon } from "achieve-it-contract";
import { mysqlErrorHandler, notFoundErrorHandler, successHandler, commonDeleteHandler, commomInsertHandler, commomUpdateHandler } from "../util";

const router = express.Router();

// 连接数据库
const conn = mysql.createConnection(config.mysql);
conn.connect();

// get /activity/:activity_id
router.get("/:activity_id", (req, res:Response<GetActivityResult>) => {
    const activity_id = req.params.activity_id;
    conn.query($sql.activity.getActivityById, [activity_id], (err, result) => {
        if (err) {
             mysqlErrorHandler(res, err);
        } else if (result.length == 1) {

            // 0-0 --> 工程活动-需求开发
            const activity_name = result[0].activity_name;
            result[0].activity_name = config.numberMap.activityName[Number(activity_name.split("-")[0])].prefix 
                + "-" + config.numberMap.activityName[Number(activity_name.split("-")[0])].activityList[Number(activity_name.split("-")[1])]

            res.json({
                activity: result[0],
                status: config.status.SUCCESS,
                msg: "success"
            })
        } else {
            notFoundErrorHandler(res);
        }
    })
})

// post /activity
router.post("/", (req, res: Response<ResultCommon>) => {
    const activity_details = req.body;
    conn.query($sql.activity.insertActivity, [activity_details.activity_name, activity_details.activity_content || ""], (err, result) => {
        commomInsertHandler(res, err);
    })

})

// put /activity/:activity_id
router.put("/:activity_id", (req, res: Response<ResultCommon>) => {
    const activity_id = req.params.activity_id;
    const activity_details = req.body;
    conn.query($sql.activity.getActivityById, [activity_id], (err, result) => {
        if (err) {
            mysqlErrorHandler(res, err);
        } else if (result.length == 1) {
            const old_activity = result[0];
            conn.query($sql.activity.updateActivityById, [activity_details.activity_name || old_activity.activity_name, 
                activity_details.activity_content || old_activity.activity_content, activity_id],
                (err2, result2) => {
                    commomUpdateHandler(res, err2);
                })
        } else {
            notFoundErrorHandler(res);
        }

    })
})

// delete /activity/:activity_id
router.delete("/:activity_id", (req, res: Response<ResultCommon>) => {
    const activity_id = req.params.activity_id;
    conn.query($sql.activity.deleteActivityById, [activity_id], (err, result) => {
        commonDeleteHandler(res, err);
    })
})

export default router;