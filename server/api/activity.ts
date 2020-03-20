import config from "../config";
import express, { Response } from "express";
import mysql from "mysql";
import $sql from './sqlMap'
import { GetActivityResult } from "achieve-it-contract";

const router = express.Router();

// 连接数据库
const conn = mysql.createConnection(config.mysql);
conn.connect();

// get /activity/:activity_id
router.get("/:activity_id", (req, res:Response<GetActivityResult>) => {
    const activity_id = req.params.activity_id;
    conn.query($sql.activity.getActivityById, [activity_id], (err, result) => {
        if (err) {
             
        }
    })
})
export default router;