import config from '../config';
import express, { Response } from 'express';
import jwt from 'jsonwebtoken';
import $sql from './sqlMap';
import { UserLoginResult } from 'achieve-it-contract';
import { mysqlErrorHandler } from '../util';
import { conn } from '../mysqlPool';

const router = express.Router();

// /user/login
// 用户登录
router.post('/login', (req, res: Response<UserLoginResult>) => {
  const username = req.body.username;
  const password = req.body.password;

  conn.query($sql.user.checkUser, [username, password], (err, result) => {
    if (err) {
      mysqlErrorHandler(res, err);
    } else if (result.length == 1) {
      // 生成token
      const token = jwt.sign(
        {
          username
        },
        config.jwt.signKey,
        {
          expiresIn: 600
        }
      );
      const user = result[0];
      res.json({
        status: 'ok',
        msg: '登陆成功',
        token,
        member_id: user.member_id
      });
    } else {
      res.json({
        status: config.status.ERROR,
        msg: '用户名或密码错误'
      });
    }
  });
});

export default router;
