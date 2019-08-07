import express from "express";
import db from "../modules/DbHelper";

let router = express.Router();

// 商品接口
router.use('/wares', (request, response, next) => {
    let tokenObj = request.body;
    if (tokenObj.token == 'toyo') {
        let sql = "SELECT * FROM `shopping`";
        db.query(sql, []).then(res => {
            response.json(res);
        }, err => {
            response.json(err);
        })
    } else {
        response.end('token错误');
    }
})


// 获取购物车
router.use('/usershop', (request, response, next) => {
    let sql = "SELECT * FROM `userinfo` WHERE uname=?";
    let params = [request.body.uname];
    db.query(sql, params).then(data => {
        response.json(data[0])
    }, err => {
        response.json(err);
    })
})

// 添加购物车接口
router.use('/addshop', (request, response, next) => {
    let addObj = request.body;
    let sql = "UPDATE `userinfo` SET ushop=? WHERE uname=?";
    let params = [addObj.ushop, addObj.uname];
    db.query(sql, params).then(res => {
        response.json(res);
    });
})


module.exports = {
    router
}