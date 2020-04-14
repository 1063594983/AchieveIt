import express, { Response } from 'express';
import { DemoResult, ResultCommon } from 'achieve-it-contract';
import config from '../config';
import email from '../email';
import multer from 'multer';
import path from 'path';
import { conn } from '../mysqlPool';

const router = express.Router();
const upload = multer({
  dest: 'upload/'
})
// post /demo/file
router.post('/file', upload.single('file'), (req: any, res, next) => {
  const file = req.file;
  console.log(path.resolve(file.path));
  res.json({
    msg: 'ok'
  })
})

// get /demo/addData
router.get('/addData', (req, res)=> {
  conn.query('select project_id from project', [], (err, result) => {
    for (let pro of result) {
      conn.query('insert into project_status (project_id) value (?)', [pro.project_id], (err)=> {

      })
    }
    res.json({
      status: '1'
    })
  })
})

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
