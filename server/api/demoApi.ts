import config from "../config";
import express, { Response } from "express";
import mysql from "mysql";
import { DemoResult } from "achieve-it-contract";

const router = express.Router();

// 连接数据库
const conn = mysql.createConnection(config.mysql);
conn.connect();

// /demo/hello
router.get("/hello", (req, res: Response<DemoResult>) => {
  console.log(res);
  res.json({
    project: "AchieveIt",
    msg: "Test",
    status: "ok"
  });
});

// /demo/getDemo
router.get("/getDemo/:employ_id", (req, res) => {
  const employ_id = req.params.employ_id;
  res.json({
    employ_id
  });
});

// /demo/postDemo
router.post("/postDemo/:employ_id", (req, res) => {
  const employ_id = req.params.employ_id;
  const username = req.body.username;
  const password = req.body.password;
  res.json({
    employ_id,
    username,
    password
  });
});

// /demo/putDemo
router.put("/putDemo", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  res.json({
    username,
    password
  });
});

// /demo/deleteDemo
router.put("/deleteDemo", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  res.json({
    username,
    password
  });
});

export default router;
