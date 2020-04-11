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
  conn.query($sql.function.getFunctionByProjectId, [project_id], (err, result) => {
    if (err) {
      mysqlErrorHandler(res, err);
    } else {
      
      res.json({
        feature_list: result,
        project_id,
        status: config.status.SUCCESS,
        msg: 'success'
      });
    }
  });
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
  // conn.query($sql.feature.getFeatureExcel, [project_id], (err, result) => {
  //   if (err) {
  //     mysqlErrorHandler(res, err);
  //   } else {
  //     if (result.length == 0) {
        
  //     } else {
  //       const fileName = result[0];
  //       const filePath = path.resolve(`./upload/feature/${result[0].excel_id}`);
  //       if (fs.exists(filePath)) {

  //       }
  //       // const fileData = excelTool.readExcel(filePath);
  //       // console.log(fileData)
  //       // res.download(filePath);
        
  //     }
  //   }
  // });
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
  if (!req.file) {
    res.json({
      status: config.status.ERROR,
      msg: '上传文件不能为空'
    })
  }
  const fileName = req.file.filename;
  res.json({
    status: config.status.SUCCESS,
    msg: '上传成功'
  })
  // conn.query($sql.feature.insertFeatureExcel, [project_id, fileName], err => {
  //   commomInsertHandler(res, err);
  // })
  
})

// router.post('/importFunctionExcelToProject/:project_id', upload.single('function'), (req, res: Response<ResultCommon>) => {
//   const project_id = req.params.project_id;
//   const function_excel = req.body.function_excel;
//   for (const item of function_excel) {
//     const parent = item.parent;
//     conn.query("insert into \`function\` (project_id, function_id, function_name, layer) values (?, ?, ?, ?)", [project_id, `${project_id}_${parent.function_name}`, parent.function_name, 1], (err) => {
//       if (err) {
//         console.log(`[myssql] ${err}`)
//       } else {
//         const children = item.children;
//         for (const child of children) {
//           conn.query("insert into \`function\` (project_id, function_id, function_name, layer, parent) values (?, ?, ?, ?, ?)", [project_id, 
//             `${project_id}_${parent.function_name}_${child.function_name}`, child.function_name, 2, `${project_id}_${parent.function_name}`], (err2) => {
//             if (err) {
//               console.log(`[myssql] ${err2}`)
//             }
//           })
//         }
//       }
//     })
//   }
//   successHandler(res);
// })

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
