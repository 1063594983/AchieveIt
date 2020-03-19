import config from '../config';
import express , { Response }  from 'express';
import mysql from 'mysql';
import $sql from './sqlMap'
import { FeatureResult, ResultCommon } from "achieve-it-contract";
const router = express.Router();

// 连接数据库
const conn = mysql.createConnection(config.mysql);
conn.connect();

// /function
// 获取项目功能
router.get("/:project_id", (req, res: Response<FeatureResult>) => {
    const project_id = req.params.project_id;
    conn.query($sql.function.getFunctionByProjectId, [project_id], (err, result) => {
        if (err) {
            res.json({
                feature: result,
                status: config.status.ERROR,
                msg: "查找失败"
            })
        } else if (result.length == 0) {
            res.json({
                feature: null,
                status: config.status.SUCCESS,
                msg: `project_id为${project_id}的项目还没有功能`
            })
        } else {
            res.json({
                feature: null, 
                status: config.status.SUCCESS ,
                msg: 'success'
            });   
        }
    })
})

// /function/addFunction
// 增加功能
router.post("/addFunction", (req, res: Response<FeatureResult>) => {
    const function_details = req.body;
    conn.query($sql.function.insertFunction, [function_details.function_name || "", function_details.project_id || "", function_details.layer || ""],
        (err, result) => {
            if (err) {
                res.json({
                    feature: null,
                    status: config.status.ERROR,
                    msg: '添加功能失败'
                })
            } else {
                res.json({
                    feature: null,
                    status: config.status.SUCCESS,
                    msg: '添加功能成功'
                })
             }
        })
})

// /function/setFunctionRelation
// 设置功能上下级关系
router.post("/setFunctionRelation", (req, res: Response<FeatureResult>) => {
    const relation_details = req.body;
    conn.query($sql.function.setFunctionRelation, [relation_details.first_function_id, relation_details.second_function_id],
        (err, result) => {
            if (err) {
                res.json({
                    feature: null,
                    status: config.status.ERROR,
                    msg: '设置失败'
                })
            } else {
                res.json({
                    feature: null,
                    status: config.status.SUCCESS,
                    msg: '设置成功'
                })
             }
        })
})

export default router;