import express, { Response, Request } from 'express';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import config from './config';
import cors from 'cors';

<<<<<<< HEAD:server/index.ts
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
=======
import userApi from './api/userApi';
import demoApi from './api/demoApi';
import memberApi from './api/memberApi';
import functionApi from './api/featureApi';
import projectApi from './api/projectApi';
import deviceApi from './api/deviceApi';
import riskApi from './api/riskApi';
import activityApi from './api/activityApi';
>>>>>>> 33b9c4624cb00b6b575336c6de03872c207006fa:server/src/index.ts

import { ResultCommon } from 'achieve-it-contract';

const app = express();
const port = 3000;

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

<<<<<<< HEAD:server/index.ts

app.use("/demo", demoApi);
app.use("/user", userApi);
app.use("/member", memberApi);
app.use("/function", functionApi);
app.use("/project", projectApi);
app.use("/device", deviceApi);
app.use("/risk", riskApi);
app.use("/activity", activityApi);
app.use("/workTime", workTimeApi);
app.use("/config", configApi);
=======
app.use('/demo', demoApi);
app.use('/user', userApi);
app.use('/member', memberApi);
app.use('/function', functionApi);
app.use('/project', projectApi);
app.use('/device', deviceApi);
app.use('/risk', riskApi);
app.use('/activity', activityApi);
>>>>>>> 33b9c4624cb00b6b575336c6de03872c207006fa:server/src/index.ts

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
