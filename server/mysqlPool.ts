import mysql from 'mysql';
import config from './config';

const pool = mysql.createPool(config.mysqlPool);

export const conn = {
    query: (sql: string, values, callback) => {
        pool.getConnection((err, conn) => {
            if (err) {
                throw err;
            }
            conn.query(sql, values, (err, result) => {
                callback(err, result);
                conn.release();
            })
        })
    }
}