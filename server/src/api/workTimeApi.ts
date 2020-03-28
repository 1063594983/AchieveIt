/**
 * @author: zou
 * @description: workTime相关的api定义
 */

import config from '../config';
import express, { Response } from 'express';
import $sql from './sqlMap';
import { conn } from '../mysqlPool';
import { mysqlErrorHandler } from '../util';
import { GetMemberWorkTimeListResul } from 'achieve-it-contract';
const router = express.Router();

// get /workTime/getMemberWorkTimeList/:member_id
router.get("/getMemberWorkTimeList/:member_id", (req, res: Response<GetMemberWorkTimeListResul>) => {
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

export default router;