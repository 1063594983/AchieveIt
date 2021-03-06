import config from '../config';
import express, { Response } from 'express';
import $sql from './sqlMap';
import { ResultCommon, GetDeviceResult, GetProjectDeviceListResult, GetAllDeviceResult } from 'achieve-it-contract';
import {
  mysqlErrorHandler,
  notFoundErrorHandler,
  commomUpdateHandler,
  commomInsertHandler,
  commonDeleteHandler
} from '../util';
import { conn } from '../mysqlPool';
const router = express.Router();

// get /device/getAllDevices
router.get('/getAllDevices', (req, res: Response<GetAllDeviceResult>) => {
  conn.query($sql.device.getAllDevices, [], (err, result) => {
    if (err) {
      mysqlErrorHandler(res, err);
    } else {
      res.json({
        device_list: result,
        status: config.status.SUCCESS,
        msg: 'get success'
      })
    }
  })
})

// get /device/:device_id
// getDevice
router.get('/:device_id', (req, res: Response<GetDeviceResult>) => {
  const device_id = req.params.device_id;
  conn.query($sql.device.getDeviceById, [device_id], (err, result) => {
    if (err) {
      mysqlErrorHandler(res, err);
    } else if (result.length == 1) {
      result[0].device_status = config.numberMap.deviceStatus[result[0].device_status];
      res.json({
        device: result[0],
        status: config.status.SUCCESS,
        msg: 'success'
      });
    } else {
      notFoundErrorHandler(res);
    }
  });
});

// put /device/:device_id
// updateDevice
router.put('/:device_id', (req, res: Response<ResultCommon>) => {
  const device_details = req.body;
  const device_id = req.params.device_id;
  console.log(device_details);
  conn.query($sql.device.getDeviceById, [device_id], (err, result) => {
    if (err) {
      mysqlErrorHandler(res, err);
    } else if (result.length == 1) {
      const old_device = result[0];
      conn.query(
        $sql.device.updateDeviceById,
        [
          device_details.device_name || old_device.device_name,
          device_details.device_status || old_device.device_status,
          device_details.project_id || old_device.project_id,
          device_id
          
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

// post /device
// insertDevice
router.post('/', (req, res: Response<ResultCommon>) => {
  const device_details = req.body;
  conn.query($sql.device.insertDevice, [device_details.device_name, device_details.device_status], err => {
    commomInsertHandler(res, err);
  });
});

// delete /device/:device_id
// unfinished: 未实现级联删除
router.delete('/:device_id', (req, res: Response<ResultCommon>) => {
  const device_id = req.params.device_id;
  conn.query($sql.device.deleteDeviceById, [device_id], err => {
    commonDeleteHandler(res, err);
  });
});

// get /device/getProjectDeviceList/:project_id
/*
router.get("/getProjectDeviceList/:project_id", (req, res: Response<GetProjectDeviceListResult>) => {
  const project_id = req.params.project_id;
  conn.query($sql.device.getProjectDeviceList, [project_id], (err, result) => {
    if (err) {
      mysqlErrorHandler(res, err);
    } else if (result.length == 1) {
      res.json({
        device_list: result,
        status: config.status.SUCCESS,
        msg: 'get success'
      })
    } else {
      console.log('123')
      notFoundErrorHandler(res);
    }
  })
})
*/

export default router;
