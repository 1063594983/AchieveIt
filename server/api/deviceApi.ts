
import config from "../config";
import express, { Response } from "express";
import mysql from "mysql";
import $sql from "./sqlMap";
import { ResultCommon, GetDeviceResult } from "achieve-it-contract";
const router = express.Router();

// 连接数据库
const conn = mysql.createConnection(config.mysql);
conn.connect();

// get /device/:device_id
// getDevice
router.get("/:device_id", (req, res: Response<GetDeviceResult>) => {
  const device_id = req.params.device_id;
  conn.query($sql.device.getDeviceById, [device_id], (err, result) => {
    if (err) {
      res.json({
        device: null,
        status: config.status.ERROR,
        msg: "error"
      });
    } else if (result.length == 1) {
        result[0].device_status = config.numberMap.deviceStatus[result[0].device_status];
      res.json({
        device: result[0],
        status: config.status.SUCCESS,
        msg: "success"
      });
    } else {
      res.json({
        device: null,
        status: config.status.ERROR,
        msg: `未找到device_id为${device_id}的device`
      });
    }
  });
});

// put /device/:device_id
// updateDevice
router.put("/:device_id", (req, res: Response<ResultCommon>) => {
  const device_details = req.body;
  const device_id = req.params.device_id;

  conn.query($sql.device.getDeviceById, [device_id], (err, result) => {
    if (err) {
      res.json({
        status: config.status.ERROR,
        msg: "error"
      });
    } else if (result.length == 1) {
      const old_device = result[0];
      conn.query(
        $sql.device.updateDeviceById,
        [
          device_details.device_name || old_device.device_name,
          device_details.device_status || old_device.device_status,
          device_id
        ],
        (err2, result2) => {
          if (err2) {
            res.json({
              status: "error",
              msg: `更新device_id为${device_id}的device失败`
            });
          } else {
            res.json({
              status: "ok",
              msg: "success"
            });
          }
        }
      );
    } else {
      res.json({
        status: "error",
        msg: `未找到device_id为${device_id}的device`
      });
    }
  });
});

// post /device
// insertDevice
router.post("/", (req, res: Response<ResultCommon>) => {
  const device_details = req.body;
  conn.query(
    $sql.device.insertDevice,
    [device_details.device_name || "", device_details.device_status || ""],
    (err, result) => {
      if (err) {
        res.json({
          status: config.status.ERROR,
          msg: "添加设备失败"
        });
      } else {
        conn.query(
          $sql.device.insertDevice,
          [
            result.insertId,
            device_details.device_name || result.insertId,
            device_details.device_status || result.insertId
          ],
          (err2, result2) => {
            if (err2) {
              res.json({
                status: "error",
                msg: "error"
              });
            } else {
              res.json({
                status: config.status.SUCCESS,
                msg: "success"
              });
            }
          }
        );
      }
    }
  );
});

// delete /device/:device_id
// unfinished: 未实现级联删除
router.delete("/:device_id", (req, res: Response<ResultCommon>) => {
  const device_id = req.params.device_id;
  conn.query($sql.device.deleteDeviceById, [device_id], (err, result) => {
    if (err) {
      res.json({
        status: "error",
        msg: "error"
      });
    } else {
      res.json({
        status: "ok",
        msg: "device删除成功"
      });
    }
  });
});

export default router;
