/**
 * @author: zou
 * @description: risk相关的api定义
 */

import config from '../config';
import express, { Response } from 'express';
import $sql from './sqlMap';
import { ResultCommon } from 'achieve-it-contract';
import { GetRiskResult, GetProjectRiskListResult } from 'achieve-it-contract/namespaces/risk';
import {
  commonDeleteHandler,
  notFoundErrorHandler,
  mysqlErrorHandler,
  commomInsertHandler,
  commomUpdateHandler
} from '../util';
import { conn } from '../mysqlPool';

const router = express.Router();

// get /risk/:risk_id
router.get('/:risk_id', (req, res: Response<GetRiskResult>) => {
  const risk_id = req.params.risk_id;
  conn.query($sql.risk.getRiskById, [risk_id], (err, result) => {
    if (err) {
      mysqlErrorHandler(res, err);
    } else if (result.length == 1) {
      result[0].detail = JSON.parse(result[0].detail);
      res.json({
        status: config.status.SUCCESS,
        msg: 'success',
        risk: result[0]
      });
    } else {
      notFoundErrorHandler(res);
    }
  });
});

// post /risk
// insertRisk
router.post('/', (req, res: Response<ResultCommon>) => {
  const risk_details = req.body;
  conn.query(
    $sql.risk.insertRisk,
    [JSON.stringify(risk_details.detail), risk_details.project_id, risk_details.solve_status],
    err => {
      commomInsertHandler(res, err);
    }
  );
});

// put /risk/:risk_id
// updateRiskById
router.put('/:risk_id', (req, res: Response<ResultCommon>) => {
  const risk_id = req.params.risk_id;
  const risk_details = req.body;
  conn.query($sql.risk.getRiskById, [risk_id], (err, result) => {
    if (err) {
      mysqlErrorHandler(res, err);
    } else if (result.length == 1) {
      const old_risk = result[0];
      const new_detail = Object.assign(JSON.parse(old_risk.detail), risk_details.detail);
      conn.query($sql.risk.updateRiskById, [JSON.stringify(new_detail), risk_details.solve_status, risk_id], err2 => {
        commomUpdateHandler(res, err2);
      });
    } else {
      notFoundErrorHandler(res);
    }
  });
});

// delete /risk/:risk_id
// deleteRisk
router.delete('/:risk_id', (req, res: Response<ResultCommon>) => {
  const risk_id = req.params.risk_id;
  conn.query($sql.risk.deleteRiskById, [risk_id], (err, result) => {
    commonDeleteHandler(res, err);
  });
});

// get /risk/getProjectRiskList
router.get('/getProjectRiskList/:project_id', (req, res: Response<GetProjectRiskListResult>) => {
  const project_id = req.params.project_id;
  conn.query($sql.risk.getProjectRiskList, [project_id], (err, result) => {
    if (err) {
      mysqlErrorHandler(res, err);
    } else {
      for (const risk of result) {
        risk.detail = JSON.parse(risk.detail);
        risk.solve_status = config.numberMap.riskStatus[risk.solve_status];
      }
      res.json({
        project_id,
        risk_list: result,
        status: config.status.ERROR,
        msg: 'success'
      });
    }
  });
});

export default router;
