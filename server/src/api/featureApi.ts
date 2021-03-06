import config from '../config';
import express, { Response } from 'express';
import $sql from './sqlMap';
import { GetProjectFeatureListResult, ResultCommon } from 'achieve-it-contract';
import { conn } from '../mysqlPool';
import { mysqlErrorHandler, commomInsertHandler, successHandler, excelTool } from '../util';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'upload/feature/');
  },
  filename: (req, file, cb) => {
    cb(null, req.params.project_id + ".xls");
  }
})

const upload = multer({
  storage: storage
})


// get /function/getProjectFunctionList/:project_id

// 获取项目功能
router.get('/getProjectFunctionList/:project_id', (req, res: Response<GetProjectFeatureListResult>) => {
  const project_id = req.params.project_id;
  const filePath = path.resolve(`./upload/feature/${project_id}.xls`);
  if (fs.existsSync(filePath)) {
    const file = excelTool.readExcel(filePath);
    console.log(project_id)
    res.json({
      project_id,
      feature_list: file,
      status: config.status.SUCCESS,
      msg: 'success'
    })
  } else {
    res.json({
      status: config.status.ERROR,
      msg: '未上传功能excel表'
    })
  }
});

// post /function/getProjectFunctionExcel/:project_id

// 获取项目功能列表
router.post('/getProjectFunctionExcel/:project_id', (req, res) => {
  const project_id = req.params.project_id;
  const filePath = path.resolve(`./upload/feature/${project_id}.xls`);
  if (fs.existsSync(filePath)) {
    res.json({
      status: config.status.SUCCESS,
      msg: 'success'
    })
  } else {
    res.json({
      status: config.status.ERROR,
      msg: '未上传功能列表'
    })
  }
});

// post /function/addFunctionToProject/:project_id
// 增加功能
router.post('/addFunction', (req, res: Response<ResultCommon>) => {
  const project_id = req.params.project_id;
  const function_details = req.body;
  conn.query(
    $sql.function.insertFunction,
    [function_details.function_name || '', project_id, function_details.layer || ''],
    (err) => {
      commomInsertHandler(res, err);
    }
  );
});


// post /function/importFunctionExcelToProject/:project_id

router.post('/importFunctionExcelToProject/:project_id', upload.single('function'), (req: any, res: Response<ResultCommon>) => {
  const project_id = req.params.project_id;
  const filePath = path.resolve(`./upload/feature/${project_id}.xls`);
  const file = excelTool.readExcel(filePath);
  let flag = true;
  for (let d of file) {
    if (d['data'].length != 1) {
      flag = false;
      break;
    }
  }
  console.log(file)
  if (!req.file) {
    res.json({
      status: config.status.ERROR,
      msg: '上传文件不能为空'
    })
  }
  if (flag == false) {
    res.json({
      status: config.status.ERROR,
      msg: '功能列表文件格式错误'
    })
  }
  const fileName = req.file.filename;
  res.json({
    status: config.status.SUCCESS,
    msg: '上传成功'
  })
})

// /function/setFunctionRelation
// 设置功能上下级关系
router.post('/setFunctionRelation', (req, res: Response<ResultCommon>) => {
  const relation_details = req.body;
  conn.query(
    $sql.function.setFunctionRelation,
    [relation_details.first_function_id, relation_details.second_function_id],
    (err => {
      commomInsertHandler(res, err);
    })
)});

export default router;
