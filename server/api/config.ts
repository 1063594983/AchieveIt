/**
 * @author: zou
 * @description: activity相关的api定义
 */

import config from "../config";
import express, { Response, response } from "express";
import mysql from "mysql";
import $sql from './sqlMap'
import { ResultCommon, GetConfigResult } from "achieve-it-contract";
import { mysqlErrorHandler, notFoundErrorHandler, commonDeleteHandler, commomInsertHandler, commomUpdateHandler } from "../util";
import { conn } from '../mysqlPool';
const router = express.Router();

// get /config/:config_id
router.get("/:config_id", (req, res: Response<GetConfigResult>) => {
    const config_id = req.params.config_id;
})

export default router;