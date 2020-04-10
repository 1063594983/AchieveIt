import config from '../config';
import express, { Response } from 'express';
import $sql from './sqlMap';
import { ResultCommon, GetProjectDefectListResult, GetAllDefectResult} from 'achieve-it-contract';
import {
  mysqlErrorHandler, commomInsertHandler, commomUpdateHandler
} from '../util';
import { conn } from '../mysqlPool';
const router = express.Router();

// get /defect/getProjectDefectList/:project_id

router.get('/getProjectDefectList/:project_id', (req, res: Response<GetProjectDefectListResult>) => {
    const project_id = req.params.project_id;
  conn.query($sql.defect.getProjectDefectList, [project_id], (err, result) => {
    if (err) {
      mysqlErrorHandler(res, err);
    } else {
      res.json({
          project_id,
        defect_list: result,
        status: config.status.SUCCESS,
        msg: 'get success'
      })
    }
  })
})

// get /defect/getAllDefect

router.get('/getAllDefect', (req, res: Response<GetAllDefectResult>) => {
    conn.query($sql.defect.getAllDefect, [], (err, result) => {
        if (err) {
            mysqlErrorHandler(res, err);
        } else {
            res.json({
                defect_list: result.map((defect) => {
                    defect.status = config.numberMap.defectStatus[defect.status];
                    return defect;
                }),
                status: config.status.SUCCESS,
                msg: 'success'
            })
        }
    })
})

// post /defect

router.post('/', (req, res: Response<ResultCommon>) => {
    const details = req.body;
    conn.query($sql.defect.insertDefect, [details.defect_content, details.project_id, details.status], err => {
        commomInsertHandler(res, err);
    })
})

// put /defect/:defect_id

router.put('/:defect_id', (req, res: Response<ResultCommon>) => {
    const defect_id = req.params.defect_id;
    const details = req.body;
    conn.query($sql.defect.updateDefect, [details.status, defect_id], err => {
        commomUpdateHandler(res, err);
    })
})
export default router;
