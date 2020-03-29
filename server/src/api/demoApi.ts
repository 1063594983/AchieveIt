import express, { Response } from 'express';
import { DemoResult, ResultCommon } from 'achieve-it-contract';
import nodeMailer from 'nodemailer';
import config from '../config';
// import SendCloud from 'sendcloud';
import email from '../email';

const router = express.Router();

// const sc = new SendCloud('BigGodZou_test_aqZdmB', 'i7axQ46h2vNJYaw6', 'test@test.com', 'test')
// const sc = new SendCloud({
//   apiUser: 'BigGodZou_test_aqZdmB',
//   apiKey: 'DdFjo0EqpQxz3XdC',
//   from: 'test@test.com',
//   name: 'test'
// })


const transporter = nodeMailer.createTransport({
  // host: 'smtp.126.com',
  service: 'smtp.126.com',
  port: 465,
  // 'secure': true,
  auth: {
    user: 'xuanlinzou@126.com',
    pass: 'BUMZOEDEMZKBYIPL'
  }
})

// post /demo/sendEmail
router.post('/sendEmail', (req, res: Response<ResultCommon>) => {
  const mailOptions = {
    from: 'xuanlinzou@126.com',
    to: '1063594983@qq.com',
    subject: 'Hello',
    text: req.body.text,
    html: '<b>Hello World</b>'
  }
  email.sendEmail({
    to: '1063594983@qq.com',
    subject: 'Hello World',
    text: 'Hello',
    html: '<b>Hello</b>'
  }, (err, info) => {
    if (err) {
      res.json({
        status: config.status.ERROR,
        msg: '[email] ' + err.response
      })
    } else {
      res.json({
        status: config.status.SUCCESS,
        msg: 'send success ' + info.messageId
      })
    }
  })
  // email.sendEmail({
  //   to: '1063594983@qq.com',
  //   subject: 'test',
  //   html: 'Hello'
  // })

  // transporter.sendMail(mailOptions, (err, info) => {
  //   if (err) {
  //     console.log(err)
  //     res.json({
  //       status: config.status.ERROR,
  //       msg: '[mail] ' + err
  //     })
  //   } else {
  //     res.json({
  //       status: config.status.SUCCESS,
  //       msg: 'Message sent: ' + info.response
  //     })
  //   }
  // })
})

// /demo/hello
router.get('/hello', (req, res: Response<DemoResult>) => {
  res.json({
    project: 'AchieveIt',
    msg: 'Test',
    status: 'ok'
  });
});

// /demo/getDemo
router.get('/getDemo/:employ_id', (req, res) => {
  const employ_id = req.params.employ_id;
  res.json({
    employ_id
  });
});

// /demo/postDemo
router.post('/postDemo/:employ_id', (req, res) => {
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
router.put('/putDemo', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  res.json({
    username,
    password
  });
});

// /demo/deleteDemo
router.put('/deleteDemo', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  res.json({
    username,
    password
  });
});

export default router;
