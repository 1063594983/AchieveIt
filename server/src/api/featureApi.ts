import config from '../config';
import express, { Response } from 'express';
import $sql from './sqlMap';
import { GetProjectFeatureListResult, ResultCommon } from 'achieve-it-contract';
import { conn } from '../mysqlPool';
import { mysqlErrorHandler, commomInsertHandler, successHandler } from '../util';

const router = express.Router();

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

// /function/addFunctionToProject/:project_id
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
router.post('/importFunctionExcelToProject/:project_id', (req, res: Response<ResultCommon>) => {
  const project_id = req.params.project_id;
  const function_excel = req.body.function_excel;
  for (const item of function_excel) {
    const parent = item.parent;
    conn.query("insert into \`function\` (project_id, function_id, function_name, layer) values (?, ?, ?, ?)", [project_id, `${project_id}_${parent.function_name}`, parent.function_name, 1], (err) => {
      if (err) {
        console.log(`[myssql] ${err}`)
      } else {
        const children = item.children;
        for (const child of children) {
          conn.query("insert into \`function\` (project_id, function_id, function_name, layer, parent) values (?, ?, ?, ?, ?)", [project_id, 
            `${project_id}_${parent.function_name}_${child.function_name}`, child.function_name, 2, `${project_id}_${parent.function_name}`], (err2) => {
            if (err) {
              console.log(`[myssql] ${err2}`)
            }
          })
        }
      }
    })
  }
  successHandler(res);
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
