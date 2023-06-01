exports.query = (sql, data = null) => {

    return new Promise((resolve, reject) => {
        const mysql = require('mysql');

        // 创建链接
        let connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456',
            database: 'sys'
        });


        // 执行链接
        connection.connect();


        // 操作数据库

        connection.query(sql, data, (error, results) => {
            if (error) {
                reject();
                return;
            }
            resolve(results);
        });


        // 关闭连接
        connection.end();
    })

}