import { ResultCommon } from "achieve-it-contract";
import { Response } from "express";
import config from "./config";

export const mysqlErrorHandler = (res: Response<ResultCommon>, err) => {
    res.json({
        status: config.status.ERROR,
        msg: "[mysql] " + err
    })
}

export const notFoundErrorHandler = (res: Response<ResultCommon>) => {
    res.json({
        status: config.status.ERROR,
        msg: "not found"
    })
}

export const successHandler = (res: Response<ResultCommon>, msg = "success") => {
    res.json({
        status: config.status.SUCCESS,
        msg: msg
    })
}

export const commomInsertHandler = (res: Response<ResultCommon>, err) => {
    if (err) {
        mysqlErrorHandler(res, err);
    } else {
        successHandler(res, "insert success");
    }
}

export const commomUpdateHandler = (res: Response<ResultCommon>, err) => {
    if (err) {
        mysqlErrorHandler(res, err);
    } else {
        successHandler(res, "update success");
    }
}

export const commonDeleteHandler = (res: Response<ResultCommon>, err) => {
    if (err) {
        mysqlErrorHandler(res, err);
    } else {
        successHandler(res, "delete success");
    }
}