import express, { Response, Request } from 'express';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import cors from 'cors';
import path from 'path';

import config from './config';
import userApi from "./api/userApi";
import demoApi from "./api/demoApi";
import memberApi from "./api/memberApi";
import functionApi from "./api/featureApi";
import projectApi from "./api/projectApi";
import deviceApi from "./api/deviceApi";
import riskApi from "./api/riskApi"
import activityApi from "./api/activityApi";
import workTimeApi from "./api/workTimeApi";
import configApi from "./api/configApi";
import defectApi from "./api/defectApi";

import { ResultCommon } from 'achieve-it-contract';

const app = express();
const port = 3001;


// 解决json数据传输问题
app.use(bodyParser.json());

// 解决跨域问题
app.use(cors());

// 解决身份验证问题
// app.use(expressJwt({
//     secret: config.jwt.signKey,
//     getToken: (req: Request) => {
//       if (req.headers.authorization) {
//         return req.headers.authorization;
//       }
//       else if (req.body && req.body.token) {
//         return req.body.token;
//       } else if (req.query && req.query.token) {
//         return req.query.token
//       }
//       return null;
//     }
// }).unless({
//     path: ["/user/login"]
// }))

// 文件服务器
app.use(express.static(path.resolve('upload')))
// console.log(path.resolve('upload'))

app.use('/demo', demoApi);
app.use('/user', userApi);
app.use('/member', memberApi);
app.use('/function', functionApi);
app.use('/project', projectApi);
app.use('/device', deviceApi);
app.use('/risk', riskApi);
app.use('/activity', activityApi);
app.use('/workTime', workTimeApi);
app.use('/config', configApi);
app.use('/defect', defectApi);

// 身份验证错误处理
app.use((err, req, res: Response<ResultCommon>, next) => {
  if (err.status == 401) {
    res.status(401).json({
      status: config.status.ERROR,
      msg: 'token失效'
    });
  }
});

app.listen(port, () => console.log(`点我 http://localhost:${port}`));

export = app
