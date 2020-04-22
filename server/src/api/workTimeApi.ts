/**
 * @author: zou
 * @description: workTime相关的api定义
 */

import config from '../config';
import express, { Response } from 'express';
import $sql from './sqlMap';
import { conn } from '../mysqlPool';
import { mysqlErrorHandler, commomInsertHandler, commomUpdateHandler } from '../util';
import { GetMemberWorkTimeListResult, ResultCommon } from 'achieve-it-contract';
const router = express.Router();

// get /workTime/getAll
router.get('/getAll', (req, res) => {
    conn.query('select * from work_time', [], (err, result) => {
        if (err) {
            mysqlErrorHandler(res, err);
        } else {
            res.json({
                work_time_list: result,
                status: config.status.SUCCESS,
                msg: 'success'
            })
        }
    })
})

// get /workTime/getMemberWorkTimeList/:member_id
router.get("/getMemberWorkTimeList/:member_id", (req, res: Response<GetMemberWorkTimeListResult>) => {
    const member_id = req.params.member_id;
    conn.query($sql.workTime.getMemberWorkTimeList, [member_id], (err, result) => {
        if (err) {
            mysqlErrorHandler(res, err);
        } else {
            res.json({
                member_id: parseInt(member_id, 10),
                work_time_list: result,
                status: config.status.SUCCESS,
                msg: 'get success'
            })
        }
    })
})

// post /workTime/:member_id
router.post("/:member_id", (req, res: Response<ResultCommon>) => {
    const member_id = req.params.member_id;
    const details = req.body;
    conn.query($sql.workTime.insertWorkTime, [member_id, details.feature_name, details.activity_content, details.project_id, details.start_time, details.end_time], (err) => {
        commomInsertHandler(res, err);
    })
})


// put /workTime/:work_time_id

router.put("/:work_time_id", (req, res) => {
    const work_time_id = req.params.work_time_id;
    const details = req.body;
    conn.query('update work_time set feature_name = ?, activity_content = ?, project_id = ?, start_time = ?, end_time = ? where work_time_id = ?', 
        [details.feature_name, details.activity_content, details.project_id, details.start_time, details.end_time, work_time_id], err => {
        commomUpdateHandler(res, err);
    })
})

// put /workTime/checkWorkTime/:work_time_id
router.put("/:checkWorkTime/:work_time_id", (req, res) => {
    const work_time_id = req.params.work_time_id;
    conn.query('update work_time set status = ? where work_time_id = ?', [1, work_time_id], err => {
        commomUpdateHandler(res, err);
    })
})

export default router;
