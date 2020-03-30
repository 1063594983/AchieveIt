/**
 * @author: zou
 * @description: config相关的api定义
 */

import config from "../config";
import express, { Response, response } from "express";
import $sql from './sqlMap'
import { ResultCommon, GetConfigResult } from "achieve-it-contract";
import { mysqlErrorHandler, notFoundErrorHandler, commonDeleteHandler, commomInsertHandler, commomUpdateHandler } from "../util";
import { conn } from '../mysqlPool';
import email from "../email";
const router = express.Router();

// get /config/:project_id
router.get('/:project_id', (req, res: Response<GetConfigResult>) => {
  const project_id = req.params.project_id;
  conn.query($sql.config.getConfigByProjectId, [project_id], (err, result) => {
    if (err) {
      mysqlErrorHandler(res, err);
    } else if (result.length == 1) {
      res.json({
        config: result[0],
        status: config.status.SUCCESS,
        msg: 'get success'
      });
    } else {
      notFoundErrorHandler(res);
    }
  });
});

// post /config
router.post("/", (req, res: Response<ResultCommon>) => {
    const details = req.body;
    conn.query($sql.config.insertConfig, [details.git_address, details.server_menu, details.vm_space, details.project_id], (err) => {
        // commomInsertHandler(res, err);
        if (err) {
            mysqlErrorHandler(res, err);
        } else {
            // 通知项目经理
            conn.query("select job, email from member where job = ?", [0], (err2, result) => {
                if (err) {
                    mysqlErrorHandler(res, err2);
                } else {
                    const emailList = result;
                    for (const e of emailList) {
                        const subject = `[${details.project_id}]项目配置库已建立 to: 项目经理`;
                        const text = `[${details.project_id}]项目配置库已建立，请开始进行人员权限设置`
                        email.sendEmail({
                            to: e.email,
                            subject,
                            text
                        }, (err, info) => {
                            if (err) {
                                console.log('send to 项目经理 failed');
                            }
                        })
                    }
                }
            })
        }
    })
})

// put /config/:project_id
router.put('/:project_id', (req, res: Response<ResultCommon>) => {
  const project_id = req.params.project_id;
  const details = req.body;
  conn.query($sql.config.getConfigByProjectId, [project_id], (err, result) => {
    if (err) {
      mysqlErrorHandler(res, err);
    } else if (result.length == 1) {
      const old = result[0];
      conn.query(
        $sql.config.updateConfigByProjectId,
        [
          details.git_address || old.git_address,
          details.server_menu || old.server_menu,
          details.vm_space || old.vm_space,
          project_id
        ],
        err2 => {
          commomUpdateHandler(res, err2);
        }
      );
    } else {
      notFoundErrorHandler(res);
    }
  });
});

// delete /config/:project_id
router.delete('/:project_id', (req, res: Response<ResultCommon>) => {
  const project_id = req.params.project_id;
  conn.query($sql.config.deleteConfigByProjectId, [project_id], (err, result) => {
    commonDeleteHandler(res, err);
  });
});
export default router;
