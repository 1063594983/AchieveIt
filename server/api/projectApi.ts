
import config from "../config";
import express, { Response, response } from "express";
import mysql from "mysql";
import $sql from "./sqlMap";
import { ResultCommon, GetProjectResult } from "achieve-it-contract";
import { commonDeleteHandler, notFoundErrorHandler, mysqlErrorHandler, commomUpdateHandler } from "../util";
import { conn } from '../mysqlPool';

const router = express.Router();

// get /project/:project_id
// getProject

router.get("/:project_id", (req, res: Response<GetProjectResult>) => {
  const project_id = req.params.project_id;

  conn.query($sql.project.getProjectById, [project_id], (err, result) => {
    if (err) {
      mysqlErrorHandler(res, err);
    } else if (result.length == 1) {
        result[0].status = config.numberMap.projectStatus[result[0].status];
      res.json({
        project: result[0],
        status: config.status.SUCCESS,
        msg: "success"
      });
    } else {
      notFoundErrorHandler(res);
    }
  });
});

// delete /project/:project_id
// deleteProject

router.delete("/:project_id", (req, res: Response<ResultCommon>) => {
  const project_id = req.params.project_id;
  conn.query($sql.project.deleteProjectById, [project_id], (err) => {
    commonDeleteHandler(res, err);
  });
});

// post /project
// insertProject
router.post("/", (req, res: Response<ResultCommon>) => {
  const project_details = req.body;
  if (!project_details.project_id) {
    return res.json({
      status: config.status.ERROR,
      msg: "项目id不能为空"
    });
  }
  conn.query(
    $sql.project.insertProject,
    [
      project_details.project_id || "",
      project_details.project_name || "",
      project_details.client_info || "",
      project_details.start_time || "",
      project_details.end_time || "",
      project_details.manager || "",
      project_details.important_events || "",
      project_details.technology || "",
      project_details.business || "",
      project_details.status || ""
    ],
    (err) => {
      commomUpdateHandler(res, err);
    }
  );
});

// put /project/:project_id
// updateProject
router.put("/:project_id", (req, res: Response<ResultCommon>) => {
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
          project_details.important_events || old_project.important_events,
          project_details.technology || old_project.technology,
          project_details.business || old_project.business,
          project_details.status || old_project.status,
          project_id
        ],
        (err2) => {
          commomUpdateHandler(res, err2);
        }
      );
    } else {
      notFoundErrorHandler(res);
    }
  });
});

export default router;
