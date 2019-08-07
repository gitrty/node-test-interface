import express from "express";
import db from "../modules/DbHelper";

let router = express.Router();

// 注册接口
router.post("/regs", (request, response, next) => {
    let userObj = request.body;
    // 参数
    let sql = "SELECT * FROM userinfo WHERE uname=?";
    let params = [userObj.uname];
    let result = {
        msg: "用户名已存在",
        status: -1
    }
    db.query(sql, params).then(res => {
        if (res == '') {
            result.msg = '注册成功';
            result.status = 1;
            let sql2 = "INSERT INTO `userinfo` (uname,upwd) VALUES (?,?)";
            let params2 = [userObj.uname, userObj.upwd];
            //添加注册用户到数据库
            db.query(sql2, params2).then(res2 => {
                console.info(res2);
            });
        }
        response.json(result);
    }, err => {
        response.json(err);
    })
})

// 登录接口
router.post('/login', (request, response, next) => {
    let userObj = request.body;
    // 参数
    let sql = "SELECT * FROM userinfo WHERE uname=? AND upwd=?";
    let params = [userObj.uname, userObj.upwd];
    // 返回值
    let result = {
        msg: '登录失败',
        status: -1
    }
    //进行查询
    db.query(sql, params).then(data => {
        // console.log(data[0])
        if (data[0]) {
            response.cookie('username', data[0].uname);
            result.msg = '登录成功';
            result.status = 1;
            result.data = data[0];
        }
        response.json(result);
    }, err => {
        response.json(result);
    });
});


// 检验是否登录  
router.use('/index', (request, response, next) => {
    let result = {
        msg: "未登录",
        status: -1
    }
    let userstauts = request.cookies;
    if (userstauts.username) {
        result.msg = "已登录";
        result.status = 1;
        result.uname = userstauts.username;
    }
    response.json(result);
})

// 退出登录接口
router.post('/esc', (request, response, next) => {
    if (request.cookies.username) {
        response.clearCookie('username');
    }
    response.end('退出成功');
})

// 验证用户名是否存在
router.post("/test", (request, response, next) => {
    let userObj = request.body;
    // 参数
    let sql = "SELECT * FROM userinfo WHERE uname=?";
    let params = [userObj.uname];
    let result = {
        msg: "用户名已存在",
        status: -1
    }
    db.query(sql, params).then(res => {
        if (res == '') {
            result.msg = '用户名可用';
            result.status = 1;
        }
        response.json(result);
    }, err => {
        response.json(err);
    })
})

module.exports = {
    router
}