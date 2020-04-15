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
  commomUpdateHandler,
  excelTool
} from '../util';
import { conn } from '../mysqlPool';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'upload/risk/');
  },
  filename: (req, file, cb) => {
    cb(null, req.params.project_id + ".xls");
  }
})

const risk = multer({
  storage: storage
})

// get /risk/getRiskOfMember/:member_id
router.get('/getRiskOfMember/:member_id', (req, res) => {
  const member_id = req.params.member_id;
  conn.query('select * from risk where owner = ?', [member_id], (err, result) => {
    if (err) {
      mysqlErrorHandler(res, err);
    } else {
      for (let r of result) {
        r.detail = JSON.parse(r.detail);
        r.stackholders = JSON.parse(r.stackholders);
      }
      res.json({
        risk_list: result,
        status: config.status.SUCCESS,
        msg: 'success'
      })
    }
  })
})

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
    [risk_details.project_id, JSON.stringify(risk_details.detail), risk_details.owner, JSON.stringify(risk_details.stackholders), 0],
    err => {
      commomInsertHandler(res, err);
    }
  );
});

// post /risk/uploadRisk/:project_id

router.post('/uploadRisk/:project_id', risk.single('risk'), (req: any, res) => {
  const project_id = req.params.project_id;
  const filePath = path.resolve(`./upload/risk/${project_id}.xls`);
  const file = excelTool.readExcel(filePath);
  console.log(file)
  const result = [];
  for (let risk of file) {
    const tmpRisk = {
      detail: {}
    };
    for (let data of risk.data) {
      tmpRisk['detail'][data[0]] = data[1] || "";
    }
    result.push(tmpRisk);
  }
  if (!req.file) {
    // const file = excelTool.readExcel(req.file)
    res.json({
      status: config.status.ERROR,
      msg: '上传文件不能为空'
    })
  }
  // console.log(req.file);
  res.json({
    result: result,
    status: config.status.SUCCESS,
    msg: '上传成功'
  })
  // conn.query($sql.feature.insertFeatureExcel, [project_id, fileName], err => {
  //   commomInsertHandler(res, err);
  // })
  
})

// put /risk/:risk_id
// updateRiskById
router.put('/:risk_id', (req, res: Response<ResultCommon>) => {
  const risk_id = req.params.risk_id;
  const risk_details = req.body;
  conn.query('update risk set solve_status = ? where risk_id = ?', [risk_details.solve_status, risk_id], err => {
    commomUpdateHandler(res, err);
  })
  // conn.query($sql.risk.getRiskById, [risk_id], (err, result) => {
  //   if (err) {
  //     mysqlErrorHandler(res, err);
  //   } else if (result.length == 1) {
  //     const old_risk = result[0];
  //     console.log(JSON.parse(old_risk.detail))
  //     console.log(risk_details.detail)
  //     const new_detail = risk_details.detail ?? old_risk.detail;
  //     conn.query($sql.risk.updateRiskById, [JSON.stringify(new_detail), risk_details.solve_status, risk_id], err2 => {
  //       commomUpdateHandler(res, err2);
  //     });
  //   } else {
  //     notFoundErrorHandler(res);
  //   }
  // });
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
        status: config.status.SUCCESS,
        msg: 'success'
      });
    }
  });
});

export default router;
