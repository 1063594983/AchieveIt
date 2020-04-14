import config from '../config';
import express, { Response } from 'express';
import $sql from './sqlMap';
import { GetMemberResult, ResultCommon, GetMemberRoleResult, GetAllMembersResult, getProjectMemberListResult } from 'achieve-it-contract';
import {
  commonDeleteHandler,
  commomInsertHandler,
  mysqlErrorHandler,
  commomUpdateHandler,
  notFoundErrorHandler
} from '../util';
import { conn } from '../mysqlPool';
import email from '../email';
const router = express.Router();

// get /member/getAllMembers

router.get('/getAllMembers', (req, res: Response<GetAllMembersResult>) => {
  conn.query($sql.member.getAllMembers, [], (err, result) => {
    if (err) {
      mysqlErrorHandler(res, err);
    } else {
      res.json({
        member_list: result,
        status: config.status.SUCCESS,
        msg: 'get success'
      })
    }
  })
})

// get /member/getProjectMemberList/:project_id

router.get('/getProjectMemberList/:project_id', (req, res: Response<getProjectMemberListResult>) =>  {
  const project_id = req.params.project_id;
  conn.query($sql.member.getProjectMemberList, [project_id], (err, result) => {
    if (err) {
      mysqlErrorHandler(res, err);
    } else {
      for (let pro of result) {
        pro.role = JSON.parse(pro.role).map((x) => {
          return config.numberMap.projectRole[x];
        });
        pro.authority = JSON.parse(pro.authority);
        pro.job = config.numberMap.memberJob[pro.job];
      }
      res.json({
        member_list: result,
        status: config.status.SUCCESS,
        msg: 'success'
      })
    }
  })
})

// get /member/:member_id
// getMember

router.get('/:member_id', (req, res: Response<GetMemberResult>) => {
  // console.log(req.user)
  const member_id = req.params.member_id;
  conn.query($sql.member.getMemberById, [member_id], (err, result) => {
    if (err) {
      mysqlErrorHandler(res, err);
    } else if (result.length == 1) {
      result[0].job = config.numberMap.memberJob[result[0].job];
      res.json({
        member: result[0],
        status: config.status.SUCCESS,
        msg: config.msg.GET_MEMBER
      });
    } else {
      notFoundErrorHandler(res);
    }
  });
});

// get /member/getMemberRoleInProject/:projec_id
router.get("/getMemberRoleInProject/:project_id", (req, res: Response<GetMemberRoleResult>) => {
  const projec_id = req.params.project_id;
  const member_id = req.query.member_id;
  conn.query($sql.member.getMemberRole, [projec_id, member_id], (err, result) => {
      if (err) {
          mysqlErrorHandler(res, err);
      } else if (result.length == 1) {
          result[0].role = JSON.parse(result[0].role).map((x) => {
            return config.numberMap.projectRole[x];
          });
          result[0].authority = JSON.parse(result[0].authority);
          res.json({
              member_role: result[0],
              status: config.status.SUCCESS,
              msg: 'get success'
          })
      } else {
          notFoundErrorHandler(res);
      }
  })
})

// put /member/:member_id
// updateMember
router.put('/:member_id', (req, res: Response<ResultCommon>) => {
  const member_details = req.body;
  const member_id = req.params.member_id;

  conn.query($sql.member.getMemberById, [member_id], (err, result) => {
    if (err) {
      mysqlErrorHandler(res, err);
    } else if (result.length == 1) {
      const old_member = result[0];
      conn.query(
        $sql.member.updateMemberById,
        [
          member_details.member_name || old_member.member_name,
          member_details.email || old_member.email,
          member_details.department || old_member.department,
          member_details.leader_email || old_member.leader_email,
          member_details.phone || old_member.phone,
          member_details.job || old_member.job,
          member_id
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

// post /memner
// insertMember
router.post('/', (req, res: Response<ResultCommon>) => {
  const member_details = req.body;
  conn.query(
    $sql.member.insertMember,
    [
      member_details.member_name || '',
      member_details.email || '',
      member_details.department || '',
      member_details.leader_email || '',
      member_details.phone || '',
      member_details.job || ''
    ],
    (err, result) => {
      if (err) {
        mysqlErrorHandler(res, err);
      } else {
        conn.query(
          $sql.user.insertUser,
          [member_details.username || result.insertId, member_details.password || result.insertId, result.insertId],
          err2 => {
            commomInsertHandler(res, err2);
          }
        );
      }
    }
  );
});

// delete /member/:member_id
// 已在数据库中实现级联删除
router.delete('/:member_id', (req, res: Response<ResultCommon>) => {
  const member_id = req.params.member_id;
  conn.query($sql.member.getMemberById, [member_id], (err, result) => {
    if (err) {
      mysqlErrorHandler(res, err);
    } else if (result.length == 0) {
      notFoundErrorHandler(res);
    } else {
      conn.query($sql.member.deleteMemberById, [member_id], err => {
        commonDeleteHandler(res, err);
      });
    }
  });
});



// post /member/addMemberToProject/:project_id
// 添加成功后会向该员工发送通知邮件

router.post("/addMemberToProject/:project_id", (req, res: Response<ResultCommon>) => {
  const project_id = req.params.project_id;
  const details = req.body;

  conn.query($sql.member.addMemberToProject, [project_id, details.member_id, JSON.stringify(details.role), JSON.stringify(details.authority)], (err) => {
    if (err) {
      mysqlErrorHandler(res, err);
    } else {
      conn.query($sql.member.getMemberById, [details.member_id], (err2, result) => {
        if (err2) {
          mysqlErrorHandler(res, err2);
        } else {
          const member = result[0];
          email.sendEmail({
            to: member.email,
            subject: `[${project_id}]项目邀请`,
            text: `你已被邀请加入${project_id}项目,你的角色为[${details.role.map((x) => config.numberMap.projectRole[x])}],你的权限为[${details.authority}]`
          }, (err, info) => {
            if (err) {
              console.log(`send to member ${details.member_id} failed`);
            }
          })
          res.json({
            status: config.status.SUCCESS,
            msg: 'success'
          })
        }
      })
    }
  })

})

// put /member/changeMemberRole/:project_id
router.put('/changeMemberRole/:project_id', (req, res: Response<ResultCommon>) => {
  const project_id = req.params.project_id;
  const details = req.body;
  console.log(req.body);
  conn.query($sql.member.changeMemberRole, [JSON.stringify(details.role.sort()), JSON.stringify(details.authority), project_id, details.member_id], err => {
    commomUpdateHandler(res, err);
  })
})


export default router;
