/**
 * @author: zou
 * @description: risk相关的api定义
 */

import config from "../config";
import express, { Response } from "express";
import mysql from "mysql";
import $sql from './sqlMap'
import { GetActivityResult, ResultCommon } from "achieve-it-contract";
import { GetRiskResult } from "achieve-it-contract/namespaces/risk";

const router = express.Router();

// 连接数据库
const conn = mysql.createConnection(config.mysql);
conn.connect();

// get /risk/:risk_id
router.get("/:risk_id", (req, res: Response<GetRiskResult>) => {
    const risk_id = req.params.risk_id;
    conn.query($sql.risk.getRiskById, [risk_id], (err, result) => {
        if (err) {
            res.json({
                status: config.status.ERROR,
                msg: "[mysql] " + err,
                risk: null
            })
        } else if (result.length == 1) {
            result[0].detail = JSON.parse(result[0].detail);
            res.json({
                status: config.status.SUCCESS,
                msg: "success",
                risk: result[0]
            })
        } else {
            res.json({
                status: config.status.ERROR,
                msg: `risk_id为${risk_id}的risk不存在`,
                risk: null
            })
        }
    })
})

// post /risk
// insertRisk
router.post("/", (req, res: Response<ResultCommon>) => {
    const risk_details = req.body;
    conn.query($sql.risk.insertRisk, [JSON.stringify(risk_details.detail)], (err, result) => {
        if (err) {
            res.json({
                status: config.status.ERROR,
                msg: "[mysql] " + err
            })
        } else {
            res.json({
                status: config.status.SUCCESS,
                msg: "success"
            })
        }
    })
})

// put /risk/:risk_id
// updateRiskById
router.put("/:risk_id", (req, res: Response<ResultCommon>) => {
    const risk_id = req.params.risk_id;
    const risk_details = req.body;
    conn.query($sql.risk.getRiskById, [risk_id], (err, result) => {
        if (err) {
            res.json({
                status: config.status.ERROR,
                msg: "[mysql] " + err
            })
        } else if (result.length == 1) {
            const old_risk = result[0];
            const new_detail = Object.assign(JSON.parse(old_risk.detail), risk_details.detail);
            conn.query($sql.risk.updateRiskById, [JSON.stringify(new_detail), risk_id], (err2, result2) => {
                if (err2) {
                    res.json({
                        status: config.status.ERROR,
                        msg: "[mysql] " + err2
                    })
                } else {
                    res.json({
                        status: config.status.SUCCESS,
                        msg: "更新成功"
                    })
                }
            })
        } else {
            res.json({
                status: config.status.ERROR,
                msg: "not found"
            })
        }
    }) 
})

// delete /risk/:risk_id
// deleteRisk
router.delete("/:risk_id", (req, res: Response<ResultCommon>) => {
    const risk_id = req.params.risk_id;
    conn.query($sql.risk.deleteRiskById, [risk_id], (err, result) => {
        if (err) {
            res.json({
                status: config.status.ERROR,
                msg: "[mysql] " + err
            })
        } else {
            res.json({
                status: config.status.SUCCESS,
                msg: "删除成功"
            })
        }
    })
})

export default router;