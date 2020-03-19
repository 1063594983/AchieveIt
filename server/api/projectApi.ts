import config from '../config';
import express, { Response, response } from 'express';
import mysql from 'mysql';
import $sql from './sqlMap';
import { ResultCommon, ProjectResult } from 'achieve-it-contract';
const router = express.Router();

// 连接数据库
const conn = mysql.createConnection(config.mysql);
conn.connect();

// get /project/:project_id
// getProject

router.get("/:project_id", (req, res: Response<ProjectResult | ResultCommon>) => {
    const project_id = req.params.project_id;

    conn.query($sql.project.getProjectById, [project_id], (err, result) => {
        if (err) {
            res.json({
                status: config.status.ERROR,
                msg: 'error'
            })
        } else if (result.length == 1) {
            res.json({
                project: result[0],
                status: config.status.SUCCESS,
                msg: 'success'
            })
        } else {
            res.json({
                status: config.status.NOT_FOUND,
                msg: `未找到project_id为${project_id}的project`
            })
        }
    })
})

// delete /project/:project_id
// deleteProject

router.delete("/:project_id", (req, res: Response<ResultCommon>) => {
    const project_id = req.params.project_id;
    conn.query($sql.project.deleteProjectById, [project_id], (err, result) => {
        if (err) {
            res.json({
                status: config.status.ERROR,
                msg: 'error'
            })
        } else if (result.affectedRows == 1) {
            res.json({
                status: config.status.SUCCESS,
                msg: '删除成功'
            })
        } else {
            res.json({
                status: config.status.NOT_FOUND,
                msg: `未找到project_id为${project_id}的project`
            })
        }
    })
})

// post /project
// insertProject
router.post("/", (req, res: Response<ResultCommon>) => {
    const project_details = req.body;
    if (!project_details.project_id) {
        return res.json({
            status: config.status.ERROR,
            msg: '项目id不能为空'
        })
    }
    conn.query($sql.project.insertProject, [project_details.project_id || "", project_details.project_name || "", project_details.client_info || "",
    project_details.start_time || "", project_details.end_time || "", project_details.manager || "",
    project_details.important_events || "", project_details.technology || "", project_details.business || "", project_details.status || ""], (err, result) => {
        if (err) {
            res.json({
                status: config.status.ERROR,
                msg: "error"
            })
        } else {
            res.json({
                status: config.status.SUCCESS,
                msg: "项目添加成功"
            })
        }
    })
})

// put /project/:project_id
// updateProject
router.put("/:project_id", (req, res: Response<ResultCommon>) => {
    const project_id = req.params.project_id;
    const project_details = req.body;

    conn.query($sql.project.getProjectById, [project_id], (err, result) => {
        if (err) {
            res.json({
                status: config.status.ERROR,
                msg: 'error'
            })
        } else if (result.length == 1) {
            const old_project = result[0];
            conn.query($sql.project.updateProjectById, [project_details.project_name || old_project.project_name, project_details.client_info || old_project.client_info,
            project_details.start_time || old_project.start_time, project_details.end_time || old_project.end_time, project_details.manager || old_project.manager,
            project_details.important_events || old_project.important_events, project_details.technology || old_project.technology, project_details.business || old_project.business,
            project_details.status || old_project.status, project_id], (err2, result2) => {
                if (err2) {
                    res.json({
                        status: config.status.ERROR,
                        msg: 'error'
                    })
                } else {
                    res.json({
                        status: config.status.SUCCESS,
                        msg: 'success'
                    })
                }
            })
        } else {
            res.json({
                status: config.status.NOT_FOUND,
                msg: `未找到project_id为${project_id}的project`
            })
        }
    })
})
export default router;