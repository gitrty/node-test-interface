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
    // if (   //   配置多个 允许跨域的域名
    //     request.headers.origin == 'http://127.0.0.1:8080' ||
    //     request.headers.origin == 'https://www.baidu.com'
    // ) {
    // 设置返回值编码
    response.setHeader("Content-Type", "application/json;charset=utf-8");
    //设置允许跨域的域名，*代表允许任意域名跨域  
    // ***********获取服务器session时 =>Access-Control-Allow-Origin不能设为星号，必须指定明确的，与请求网页一致的域名*************
    response.header("Access-Control-Allow-Origin", 'http://127.0.0.1:8080');
    //允许的header类型
    response.header("Access-Control-Allow-Headers", 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    //跨域允许的请求方式 
    response.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");

    response.header('Access-Control-Allow-Credentials', true);
    next();
    // }
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
    if (request.session['userInfo']) {
        delete request.session.userInfo;
    }
    response.end('退出成功');
})


// 模拟商品
let wares = [
    [//1
        { wname: "恋人絮语", wprice: "655999", wimg: "1500616780447824288" },
        { wname: "典雅", wprice: "7115", wimg: "1507630507958889089" },
        { wname: "爱守护-公主", wprice: "12280", wimg: "1500616949483449841" },
        { wname: "玫瑰情事", wprice: "3889", wimg: "1507630587747792085" },
        { wname: "简单爱", wprice: "4226", wimg: "1500617011079585423" },
        { wname: "百年经典", wprice: "5305", wimg: "1500617216838965590" },
        { wname: "经典皇冠", wprice: "8899", wimg: "1507621834900057751" }
    ],
    [//2
        { wname: "暖怀", wprice: "13260", wimg: "1507626008904752881" },
        { wname: "永恒的爱", wprice: "7115", wimg: "1507622712792079328" },
        { wname: "玫瑰之心", wprice: "12280", wimg: "1507622832124257383" },
        { wname: "璀璨", wprice: "3889", wimg: "1507633670150749152" },
        { wname: "爱的星芒", wprice: "4226", wimg: "1507623006415184714" },
        { wname: "浪漫星辰", wprice: "5305", wimg: "1507683862981910664" },
        { wname: "炫舞", wprice: "8899", wimg: "1507623169593245033" }
    ],
    [//3
        { wname: "爱情誓言", wprice: "6559", wimg: "1507625137321616635" },
        { wname: "典雅", wprice: "7115", wimg: "1507625253894581590" },
        { wname: "爱守护-公主", wprice: "12280", wimg: "1507625307758297245" },
        { wname: "玫瑰情事", wprice: "3889", wimg: "1507626536678952341" },
        { wname: "简单爱", wprice: "4226", wimg: "1507626588227205108" },
        { wname: "百年经典", wprice: "5305", wimg: "1507625531586471361" },
        { wname: "经典皇冠", wprice: "8899", wimg: "1507625717305361899" }
    ],
    [//4
        { wname: "暖怀", wprice: "13260", wimg: "1507626120997791493" },
        { wname: "典雅", wprice: "7115", wimg: "1507626186869808694" },
        { wname: "爱守护-公主", wprice: "12280", wimg: "1507626250892221225" },
        { wname: "玫瑰情事", wprice: "3889", wimg: "1507634133240632309" },
        { wname: "简单爱", wprice: "4226", wimg: "1507634195823211283" },
        { wname: "百年经典", wprice: "5305", wimg: "1507634241262344959" },
        { wname: "经典皇冠", wprice: "8899", wimg: "1507634282586237753" }
    ],
    [//5
        { wname: "恋人絮语", wprice: "6559", wimg: "1507634426085646503" },
        { wname: "典雅", wprice: "7115", wimg: "1507635211511104776" },
        { wname: "爱守护-公主", wprice: "12280", wimg: "1507684042002748574" },
        { wname: "玫瑰情事", wprice: "3889", wimg: "1507634825496884433" },
        { wname: "简单爱", wprice: "4226", wimg: "1507635031885329282" },
        { wname: "百年经典", wprice: "5305", wimg: "1507635088672985655" },
        { wname: "经典皇冠", wprice: "8899", wimg: "1507635139055710507" }
    ]
]

// 商品接口
app.post('/api/wares', (request, response, next) => {
    let tokenObj = request.body;
    if (tokenObj.token == 'toyo') {
        response.json(wares);
    } else {
        response.end('token错误');
    }
})
