import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";

let app = express();

// 注册 中间件
app.use(bodyParser({
    extended: false
}));
app.use(cookieParser());
app.use(cookieSession({
    keys: ['abc'],
    maxAge: 1000 * 60 * 20
}));

// 开启服务
app.listen(8088, () => {
    console.info('服务启动完毕');
})

// 拦截器
app.use('/api', (request, response, next) => {
    // 设置返回值编码
    response.setHeader("Content-Type", "application/json;charset=utf-8");
    //设置允许跨域的域名，*代表允许任意域名跨域  
    // ***********获取服务器session时 =>Access-Control-Allow-Origin不能设为星号，必须指定明确的，与请求网页一致的域名*************
    response.header("Access-Control-Allow-Origin", "http://localhost:8080");
    //允许的header类型
    response.header("Access-Control-Allow-Headers", 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    //跨域允许的请求方式 
    response.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");

    response.header('Access-Control-Allow-Credentials', true);
    next();
})

//模拟数据库
let userList = [
    { uname: 'abc123', upwd: 123 }
]

// 注册接口
/**
 * success  =>  msg,status
 * error    =>  msg,status
 */
app.post("/api/regs", (request, response, next) => {
    let userObj = request.body;
    let flag = userList.some(el => {
        return el.uname == userObj.uname;
    })
    let result = {
        msg: "用户名已存在",
        status: -1
    }
    if (!flag) {
        result.msg = "注册成功";
        result.status = 1;
        // 注册成功 , 将用户信息添加到数据库
        userList.push(userObj);
    }
    response.json(result);
})

// 登录接口
/**
 * success  =>  msg,status,uname,upwd
 * error    =>  msg,status
 */
app.post('/api/login', (request, response, next) => {
    let userObj = request.body;
    let flag = userList.some(el => {
        return el.uname == userObj.uname && el.upwd == userObj.upwd;
    })
    let RTObj = JSON.parse(JSON.stringify(userObj));

    if (flag) {
        // 登录成功 创建 session
        request.session['userInfo'] = userObj;
        console.info(request.session['userInfo']);

        RTObj.msg = '登录成功';
        RTObj.status = 1;
    } else {
        RTObj.msg = '登录失败';
        RTObj.status = -1;
        delete (RTObj.uname);
        delete (RTObj.upwd);
    }
    // console.info("储存session-------"+request.session['userInfo'].uname);

    response.json(RTObj);
})

// 检验是否登录  
/**
 * success  =>  msg,status,uname
 * error    =>  msg,status
 */
app.post('/api/index', (request, response, next) => {
    let result = {
        msg: "未登录",
        status: -1
    }
    console.info(request.session['userInfo']);

    if (!(request.session['userInfo'] == undefined)) {
        result.msg = "已登录";
        result.status = 1;
        result.uname = request.session['userInfo'].uname;
    }
    // console.info("验证是否登录---------------"+result.msg); 
    response.json(result);
})

// 退出登录接口
/**
 * success  "退出成功"
 */
app.post('/api/esc', (request, response, next) => {
    if(request.session['userInfo']){
        delete request.session.userInfo;
    }
    response.end('退出成功');
})


