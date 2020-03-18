import config from '../config'
import express from 'express'
import mysql from 'mysql'
import jwt from 'jsonwebtoken'

const router = express.Router();

// 连接数据库
const conn = mysql.createConnection(config.mysql);
conn.connect();

// /user/login
// 用户登录
router.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // 生成token
    const token = "Bearer " + jwt.sign({
        username
    }, config.jwt.signKey, {
        expiresIn: 600
    });
    res.json({
        token
    });
})

export default router;