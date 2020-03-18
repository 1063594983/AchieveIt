import express from 'express'
import bodyParser from 'body-parser'
import expressJwt from 'express-jwt'
import config from './config'
import cors from 'cors'

import userApi from './api/userApi'
import demoApi from './api/demoApi'
import memberApi from './api/memberApi'

const app = express()
const port = 3000

// 解决json数据传输问题
app.use(bodyParser.json());

// 解决身份验证问题
// app.use(expressJwt({
//     secret: config.jwt.signKey
// }).unless({
//     path: ["/user/login"]
// }))

// 解决跨域问题
app.use(cors());


app.use("/demo", demoApi);
app.use("/user", userApi);
app.use("/member", memberApi);

// 身份验证错误处理
app.use((err, req, res, next) => {
    if (err.status == 401) {
        res.status(401).send('token失效');
    }
})

app.listen(port, () => console.log(`点我 http://localhost:${port}`))
