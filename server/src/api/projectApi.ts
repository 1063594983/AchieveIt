import config from '../config';
import express, { Response, response } from 'express';
import $sql from './sqlMap';
import { ResultCommon, GetProjectResult, ProjectList, GetJoinProjectsResult } from 'achieve-it-contract';
import { commonDeleteHandler, notFoundErrorHandler, mysqlErrorHandler, commomUpdateHandler, commomInsertHandler } from '../util';
import { conn } from '../mysqlPool';
import email from '../email';

const router = express.Router();


// get /project/getAllProjects
// 获取所有项目的列表
router.get('/getAllProjects', (req, res: Response<ProjectList>) => {
  conn.query($sql.project.getAllProjects, [], (err, result) => {
    if (err) {
      mysqlErrorHandler(res, err);
    } else {
      for (let i in result) {
        result[i].status = config.numberMap.projectStatus[result[i].status];
        result[i].important_events = JSON.parse(result[i].important_events);
        result[i].technology = JSON.parse(result[i].technology);
        result[i].business = JSON.parse(result[i].business);
      }
      res.json({
        project_list: result,
        msg: 'success',
        status: config.status.SUCCESS
      })
    }
  })
})


// get /project/:project_id
// getProject

router.get('/:project_id', (req, res: Response<GetProjectResult>) => {
  const project_id = req.params.project_id;

  conn.query($sql.project.getProjectById, [project_id], (err, result) => {
    if (err) {
      mysqlErrorHandler(res, err);
    } else if (result.length == 1) {
      result[0].status = config.numberMap.projectStatus[result[0].status];
      result[0].important_events = JSON.parse(result[0].important_events);
      result[0].technology = JSON.parse(result[0].technology);
      result[0].business = JSON.parse(result[0].business);
      res.json({
        project: result[0],
        status: config.status.SUCCESS,
        msg: 'success'
      });
    } else {
      notFoundErrorHandler(res);
    }
  });
});

// get /project/getJoinProjects/:member_id
router.get("/getJoinProjects/:member_id", (req, res: Response<GetJoinProjectsResult>) => {
  const member_id = req.params.member_id;
  conn.query($sql.project.getJoinProject, [member_id], (err, result) => {
    if (err) {
      mysqlErrorHandler(res, err);
    } else {
      res.json({
        project_list: result,
        status: config.status.SUCCESS,
        msg: 'success'
      })
    }
  })
})

// get /project/hasEPG/:project_id
router.get('/hasEPG/:project_id', (req, res: Response<ResultCommon>) => {
  const project_id = req.params.project_id;
  conn.query("SELECT * FROM member_project where role like '%6%' and project_id = ?", [project_id], (err, result) => {
    if (err) {
      mysqlErrorHandler(res, err);
    } else {
      if (result.length != 0) {
        res.json({
          status: config.status.SUCCESS,
          msg: 'success'
        })
      } else {
        notFoundErrorHandler(res);
      }
    }
  })
})

// get /project/hasQA/:project_id
router.get('/hasQA/:project_id', (req, res: Response<ResultCommon>) => {
  const project_id = req.params.project_id;
  conn.query("SELECT * FROM member_project where role like '%5%' and project_id = ?", [project_id], (err, result) => {
    if (err) {
      mysqlErrorHandler(res, err);
    } else {
      if (result.length != 0) {
        res.json({
          status: config.status.SUCCESS,
          msg: 'success'
        })
      } else {
        notFoundErrorHandler(res);
      }
    }
  })
})

// delete /project/:project_id
// deleteProject

router.delete('/:project_id', (req, res: Response<ResultCommon>) => {
  const project_id = req.params.project_id;
  conn.query($sql.project.deleteProjectById, [project_id], err => {
    commonDeleteHandler(res, err);
  });
});

// post /project
// insertProject
router.post('/', (req, res: Response<ResultCommon>) => {
  const project_details = req.body;
  if (!project_details.project_id) {
    return res.json({
      status: config.status.ERROR,
      msg: '项目id不能为空'
    });
  }
  project_details.start_time = new Date(project_details.start_time).toLocaleDateString();
  project_details.end_time = new Date(project_details.end_time).toLocaleDateString();
  conn.query(
    $sql.project.insertProject,
    [
      project_details.project_id || '',
      project_details.project_name || '',
      project_details.client_info || '',
      project_details.start_time || '',
      project_details.end_time || '',
      project_details.manager || '',
      JSON.stringify(project_details.important_events) || '[]',
      JSON.stringify(project_details.technology) || '[]',
      JSON.stringify(project_details.business) || '[]',
      project_details.status
    ],
    err => {
      if (err) {
        mysqlErrorHandler(res, err);
      } else {

        // 向相关者发送邮件(1-项目上级，3-EPGLeader，4-QA Manager，2-配置管理员)
        conn.query("select job, email from member where job = ? or job = ? or job = ? or job = ?", [1, 2, 3, 4], (err, result) => {
          if (err) {
            mysqlErrorHandler(res, err);
          } else {
            const member_list = project_details.member_list;
            conn.query("insert into member_project (project_id, member_id, role, authority) values (?, ?, ?, ?)", [project_details.project_id, 1, '[]', '[]'], err2 => {
              if (err2) {
                console.log(err2);
              }
            })
            for (let member of member_list) {
              conn.query("insert into member_project (project_id, member_id, role, authority) values (?, ?, ?, ?)", [project_details.project_id, member, '[]', '[]'], err2 => {
                if (err2) {
                  console.log(err2);
                }
              })
            }
            const emailList = result;
            for (const e of emailList) {
              const subject = `项目立项 to: ${config.numberMap.memberJob[e.job]}`;

              switch (e.job) {
                case 1:
                  // email.sendEmail({
                  //   to: e.email,
                  //   subject,
                  //   html: `${JSON.stringify(project_details)}<br/><a href="http://localhost:3000/project/acceptProject/${project_details.project_id}">批准立项</a>
                  //   &nbsp;&nbsp;<a href="http://localhost:3000/project/refuseProject/${project_details.project_id}">不批准立项</a>`
                  // }, (err, info) => {
                  //   if (err) {
                  //     console.log('send to 项目上级 failed')
                  //   }
                  // })
                  break;
                case 2:
                  // email.sendEmail({
                  //   to: e.email,
                  //   subject,
                  //   html: `${JSON.stringify(project_details)}<br/>项目已立项，待批准后请为项目建立基本的配置库`
                  // }, (err, info) => {
                  //   if (err) {
                  //     console.log('send to 配置管理员 failed')
                  //   }
                  // })
                  break;
                case 3:
                  // email.sendEmail({
                  //   to: e.email,
                  //   subject,
                  //   html: `${JSON.stringify(project_details)}<br/>项目已立项，待批准后请为项目分配EPG`
                  // }, (err, info) => {
                  //   if (err) {
                  //     console.log('send to EPG Leader failed')
                  //   }
                  // })
                  break;
                case 4:
                  // email.sendEmail({
                  //   to: e.email,
                  //   subject,
                  //   html: `${JSON.stringify(project_details)}<br/>项目已立项，待批准后请为项目分配QA`
                  // }, (err, info) => {
                  //   if (err) {
                  //     console.log('send to QA Manager failed')
                  //   }
                  // })
                  break;
              }
              // email.sendEmail({
              //   to: e.email,
              //   subject: '项目立项 to: ' + config.numberMap.memberJob[e.job],
              //   text: JSON.stringify(project_details),
              //   html: e.job == 1 ? JSON.stringify(project_details) + "<br/><a href=''>批准立项</a>&nbsp;&nbsp;<a href=''>不批准立项</a>" : ""
              // }, () => {})
            }
            // console.log(emailList);
            res.json({
              status: config.status.SUCCESS,
              msg: 'success'
            })
          }
        })
      }
    }
  );
});

// put /project/:project_id
// updateProject
router.put('/:project_id', (req, res: Response<ResultCommon>) => {
  const project_id = req.params.project_id;
  const project_details = req.body;

  conn.query($sql.project.getProjectById, [project_id], (err, result) => {
    if (err) {
      mysqlErrorHandler(res, err);
    } else if (result.length == 1) {
      const old_project = result[0];
      conn.query(
        $sql.project.updateProjectById,
        [
          project_details.project_name || old_project.project_name,
          project_details.client_info || old_project.client_info,
          project_details.start_time || old_project.start_time,
          project_details.end_time || old_project.end_time,
          project_details.manager || old_project.manager,
          JSON.stringify(project_details.important_events) || old_project.important_events,
          JSON.stringify(project_details.technology) || old_project.technology,
          JSON.stringify(project_details.business) || old_project.business,
          project_details.status || old_project.status,
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

// get /project/acceptProject/:project_id
// 批准立项
router.get('/acceptProject/:project_id', (req, res: Response<ResultCommon>) => {
  const project_id = req.params.project_id;
  conn.query($sql.project.updateProjectStatus, [1, project_id], err => {
    // commomUpdateHandler(res, err);
    if (err) {
      mysqlErrorHandler(res, err);
    } else {
      // 通知组织配置管理员，EPG Leader， QA Manager
      conn.query("select job, email from member where job = ? or job = ? or job = ? or job = ?", [0, 2, 3, 4], (err2, result) => {
        if (err2) {
          mysqlErrorHandler(res, err2);
        } else {
          const emailList = result;
          for (const e of emailList) {
            const subject = `[${project_id}]项目已立项 to: ${config.numberMap.memberJob[e.job]}`
            switch (e.job) {
              case 0:
                email.sendEmail({
                  to: e.email,
                  subject,
                  text: `[${project_id}]项目已立项, 请为项目分配人员和任务`
                }, (err, info) => {
                  if (err) {
                    console.log("send to 组织配置管理员 failed");
                  }
                })
                break;
              case 2:
                email.sendEmail({
                  to: e.email,
                  subject,
                  text: `[${project_id}]项目已立项, 请为项目建立基本的配置库`
                }, (err, info) => {
                  if (err) {
                    console.log("send to 组织配置管理员 failed");
                  }
                })
                break;
              case 3:
                email.sendEmail({
                  to: e.email,
                  subject,
                  text: `[${project_id}]项目已立项, 请为项目分配EPG`
                }, (err, info) => {
                  if (err) {
                    console.log("send to EPG Leader failed");
                  }
                })
                break;
              case 4:
                email.sendEmail({
                  to: e.email,
                  subject,
                  text: `[${project_id}]项目已立项, 请为项目分配QA`
                }, (err, info) => {
                  if (err) {
                    console.log("send to QA Manager failed");
                  }
                })
                break;
            }
          }
        }
        res.json({
          status: config.status.SUCCESS,
          msg: 'success'
        })
      })
    }
  })
})

// get /project/refuseProject/:project_id
// 不批准立项
router.get('/refuseProject/:project_id', (req, res: Response<ResultCommon>) => {
  const project_id = req.params.project_id;
  conn.query($sql.project.updateProjectStatus, [2, project_id], err => {
    // commomUpdateHandler(res, err);
    if (err) {
      mysqlErrorHandler(res, err);
    } else {
      // 通知组织配置管理员，EPG Leader， QA Manager
      conn.query("select job, email from member where job = ? or job = ? or job = ? or job = ?", [0, 2, 3, 4], (err2, result) => {
        if (err2) {
          mysqlErrorHandler(res, err2);
        } else {
          const emailList = result;
          for (const e of emailList) {
            const subject = `[${project_id}]项目已被驳回 to: ${config.numberMap.memberJob[e.job]}`
            const text = "如题";
            email.sendEmail({
              to: e.email,
              subject,
              text
            }, (err, info) => {
              if (err) {
                console.log(`send to ${config.numberMap.memberJob[e.job]} failed`);
              }
            })
          }
        }
        res.json({
          status: config.status.SUCCESS,
          msg: 'success'
        })
      })
    }
  })
})



export default router;
