import config from '../config'
import express from 'express'
import mysql from 'mysql'
import jwt from 'jsonwebtoken'
import $sql from './sqlMap'

const router = express.Router();

// 连接数据库
const conn = mysql.createConnection(config.mysql);
conn.connect();

// /user/login
// 用户登录
router.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    conn.query($sql.user.checkUser, [username, password], (err, result) => {
        if (err) {
            console.log(err);
            res.json({
                status: "error",
                msg: "error"
            })
        }
        else if (result.length == 1) {
            // 生成token
            const token = "Bearer " + jwt.sign({
                username
            }, config.jwt.signKey, {
                expiresIn: 600
            });
            const user = result[0];
            res.json({
                status: "ok",
                msg: "登陆成功",
                token,
                member_id: user.member_id
            })
        } else {
            res.json({
                status: "refuse",
                msg: "用户名或密码错误"
            })
        }
    })


})

export default router;