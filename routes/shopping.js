import express from "express";
import db from "../modules/DbHelper";

let router = express.Router();

// 商品接口
router.use('/wares', (request, response, next) => {
    let tokenObj = request.body;
    if (tokenObj.token == 'toyo') {
        let sql = "SELECT * FROM `shopping`";
        db.query(sql, []).then(res => {
            console.info(res);
            response.json(res);
        }, err => {
            response.json(err);
        })
    } else {
        response.end('token错误');
    }
})


module.exports = {
    router
}