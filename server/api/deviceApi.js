import config from '../config'
import express from 'express'
import mysql from 'mysql'
import $sql from './sqlMap'

const router = express.Router();

// 连接数据库
const conn = mysql.createConnection(config.mysql);
conn.connect();

// get /device/:device_id
// getDevice
router.get("/:device_id", (req, res) => {
    const device_id = req.params.device_id;
    conn.query($sql.device.getDeviceById, [device_id], (err, result) => {
        if (err) {
            res.json({
                status: "error",
                msg: "error"
            })
        } else if (result.length == 1) {
            res.json({...result[0], status:'ok'});
        } else {
            res.json({
                status: "not found",
                msg: `未找到device_id为${device_id}的device`
            })
        }
    })
})

// post /device/:device_id
// updateDevice
router.post("/:device_id", (req, res) => {
    const device_details = req.body;
    const device_id = req.params.device_id;

    conn.query($sql.device.getDeviceById, [device_id], (err, result) => {
        if (err) {
            res.json({
                status: "error",
                msg: "error"
            })
        } else if (result.length == 1) {
            const old_device = result[0];
            conn.query($sql.device.updateDeviceById,
                [device_details.device_name || old_device.device_name,
                    device_details.device_status || old_device.device_status], (err2, result2) => {
                    if (err2) {
                        res.json({
                            status: "error",
                            msg: `更新device_id为${device_id}的device失败`
                        })
                    } else {
                        res.json({
                            status: "ok"
                        })
                    }


                })
        } else {
            res.json({
                status: "not found",
                msg: `未找到device_id为${device_id}的device`
            })
        }
    })
})


// put /device
// insertDevice
router.put("/", (req, res) => {
    const device_details = req.body;
    conn.query($sql.device.insertDevice, [device_details.device_name || "", device_details.device_status || ""],
        (err, result) => {
            if (err) {
                res.json({
                    status: 'error',
                    msg: '添加设备失败'
                })
            } else {
                conn.query($sql.device.insertDevice, [result.insertId, device_details.device_name || result.insertId, device_details.device_status || result.insertId], (err2, result2) => {
                    if (err2) {
                        res.json({
                            status: 'error',
                            msg: 'error'
                        })
                    } else {
                        res.json({
                            status: 'success'
                        })
                    }
                })
            }
        })
})

// delete /device/:device_id
// unfinished: 未实现级联删除
router.delete("/:device_id", (req, res) => {
    const device_id = req.params.device_id;
    conn.query($sql.device.deleteDeviceById, [device_id], (err, result) => {
        if (err) {
            res.json({
                status: 'error',
                msg: 'error'
            })
        } else {

            res.json({
                status: 'ok',
                msg: 'device删除成功'
            })
        }
    })
})


export default router;