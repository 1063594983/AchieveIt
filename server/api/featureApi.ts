/**
 * @author: gbk
 * @description: feature相关的api定义
 */

import config from "../config";
import express, { Response } from "express";
import $sql from "./sqlMap";
import { GetFeatureListResult, ResultCommon } from "achieve-it-contract";
import { commonDeleteHandler, commomInsertHandler, mysqlErrorHandler, commomUpdateHandler, notFoundErrorHandler } from "../util";
import { conn } from '../mysqlPool';

const router = express.Router();

// /function/:project_id

// 获取项目功能
router.get("/:project_id", (req, res: Response<GetFeatureListResult>) => {
  const project_id = req.params.project_id;
  conn.query(
    $sql.function.getFunctionByProjectId,
    [project_id],
    (err, result) => {
      if (err) {
        mysqlErrorHandler(res, err);
      } else {
        res.json({
          featureList: result,
          status: config.status.SUCCESS,
          msg: "success"
        });
      }
    }
  );
});

// /function/addFunction
// 增加功能
router.post("/addFunction", (req, res: Response<ResultCommon>) => {
  const function_details = req.body;
  conn.query(
    $sql.function.insertFunction,
    [
      function_details.function_name || "",
      function_details.project_id || "",
      function_details.layer || ""
    ],
    (err, result) => {
      if (err) {
        mysqlErrorHandler(res, err);
      } else {
        commomInsertHandler(res, err)
      }
    }
  );
});

// /function/setFunctionRelation
// 设置功能上下级关系
router.post("/setFunctionRelation", (req, res: Response<ResultCommon>) => {
  const relation_details = req.body;
  conn.query(
    $sql.function.setFunctionRelation,
    [relation_details.first_function_id, relation_details.second_function_id],
    (err, result) => {
      if (err) {
        mysqlErrorHandler(res, err);
      } else {
        commomUpdateHandler(res, err)
      }
    }
  );
});

export default router;
