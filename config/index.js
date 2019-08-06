// 下载并引入 mysql 模块
import mysql from "mysql";
// 配置连接
let pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'daiouni',
    port: 3306
})

module.exports = {
    pool
}
