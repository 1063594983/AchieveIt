import express, { Response } from 'express';
import { DemoResult, ResultCommon } from 'achieve-it-contract';
import config from '../config';
import email from '../email';

const router = express.Router();

// post /demo/sendEmail
router.post('/sendEmail', (req, res: Response<ResultCommon>) => {
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
