/**
 * @author: zou
 * @description: activity相关的api定义
 */

import config from '../config';
import express, { Response, response } from 'express';
import $sql from './sqlMap';
import { GetActivityResult, ResultCommon, GetProjectActivityListResult, GetAllActivitysResult } from 'achieve-it-contract';
import {
  mysqlErrorHandler,
  notFoundErrorHandler,
  commonDeleteHandler,
  commomInsertHandler,
  commomUpdateHandler
} from '../util';
import { conn } from '../mysqlPool';
const router = express.Router();

// get /activity/getAllActivitys
router.get('/getAllActivitys', (req, res: Response<GetAllActivitysResult>) => {
  conn.query($sql.activity.getAllActivitys, [], (err, result) => {
    if (err) {
      mysqlErrorHandler(res, err);
    } else {
      result = result.map((a) => {
        a.activity_name = config.numberMap.activityName[Number(a.activity_name.split('-')[0])].prefix +
        '-' +
        config.numberMap.activityName[Number(a.activity_name.split('-')[0])].activityList[
          Number(a.activity_name.split('-')[1])
        ];
        return a;
      })
      res.json({
        activity_list: result,
        status: config.status.SUCCESS,
        msg: 'success'
      })
    }
  })
})

// get /activity/:activity_id
router.get('/:activity_id', (req, res: Response<GetActivityResult>) => {
  const activity_id = req.params.activity_id;
  conn.query($sql.activity.getActivityById, [activity_id], (err, result) => {
    if (err) {
      mysqlErrorHandler(res, err);
    } else if (result.length == 1) {
      // 0-0 --> 工程活动-需求开发
      const activity_name = result[0].activity_name;
      result[0].activity_name =
        config.numberMap.activityName[Number(activity_name.split('-')[0])].prefix +
        '-' +
        config.numberMap.activityName[Number(activity_name.split('-')[0])].activityList[
          Number(activity_name.split('-')[1])
        ];

      res.json({
        activity: result[0],
        status: config.status.SUCCESS,
        msg: 'success'
      });
    } else {
      notFoundErrorHandler(res);
    }
  });
});

// get /activity/getProjectActivityList/:project_id
router.get('/getProjectActivityList/:project_id', (req, res: Response<GetProjectActivityListResult>) => {
  const activity_id = req.params.project_id;
  conn.query($sql.activity.getProjectActivityList, [activity_id], (err, result) => {
    if (err) {
      mysqlErrorHandler(res, err);
    } else {
      // 0-0 --> 工程活动-需求开发
      result = result.map((a) => {
        a.activity_name = config.numberMap.activityName[Number(a.activity_name.split('-')[0])].prefix +
        '-' +
        config.numberMap.activityName[Number(a.activity_name.split('-')[0])].activityList[
          Number(a.activity_name.split('-')[1])
        ];
        return a;
      })
      res.json({
        activity_list: result,
        status: config.status.SUCCESS,
        msg: 'success'
      });
    }
  });
});





// post /activity
router.post('/', (req, res: Response<ResultCommon>) => {
  const activity_details = req.body;
  conn.query(
    $sql.activity.insertActivity,
    [activity_details.project_id, activity_details.activity_name, activity_details.activity_content || ''],
    err => {
      commomInsertHandler(res, err);
    }
  );
});

// put /activity/:activity_id
router.put('/:activity_id', (req, res: Response<ResultCommon>) => {
  const activity_id = req.params.activity_id;
  const activity_details = req.body;
  conn.query($sql.activity.getActivityById, [activity_id], (err, result) => {
    if (err) {
      mysqlErrorHandler(res, err);
    } else if (result.length == 1) {
      const old_activity = result[0];
      conn.query(
        $sql.activity.updateActivityById,
        [
          activity_details.activity_name || old_activity.activity_name,
          activity_details.activity_content || old_activity.activity_content,
          activity_id
        ],
        (err2, result2) => {
          commomUpdateHandler(res, err2);
        }
      );
    } else {
      notFoundErrorHandler(res);
    }
  });
});

// delete /activity/:activity_id
router.delete('/:activity_id', (req, res: Response<ResultCommon>) => {
  const activity_id = req.params.activity_id;
  conn.query($sql.activity.deleteActivityById, [activity_id], (err, result) => {
    commonDeleteHandler(res, err);
  });
});

export default router;
