import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";

let app = express();

// 注册 中间件
app.use(bodyParser({    //req.body-->post   req.query-->get
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
app.use('*', (request, response, next) => {
    if (   //   配置多个 允许跨域的域名
        request.headers.origin == 'http://127.0.0.1:8080' ||
        request.headers.origin == 'http://127.0.0.1:5500' ||
        request.headers.origin == 'http://localhost:8080'
    ) {
    // 设置返回值编码
    response.setHeader("Content-Type", "application/json;charset=utf-8");
    //设置允许跨域的域名，*代表允许任意域名跨域  
    // ***********获取服务器session时 =>Access-Control-Allow-Origin不能设为星号，必须指定明确的，与请求网页一致的域名*************
    response.header("Access-Control-Allow-Origin", request.headers.origin);
    //允许的header类型
    response.header("Access-Control-Allow-Headers", 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    //跨域允许的请求方式 
    response.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");

    response.header('Access-Control-Allow-Credentials', true);
    next();
    }
});

app.use('/api', require('./routes/api').router);

app.use('/shopping', require('./routes/shopping').router);