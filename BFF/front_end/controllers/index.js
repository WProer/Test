const router = require('koa-simple-router');
// 返回图书页
const IndexContro = require("./indexContro.js");
const indexContro = new IndexContro();

// 返回接口
const APIContro = require("./APIController.js");
const apiContro = new APIContro();

// 传统router方式
/* module.exports = (app) => {
    app.use(router(_ => {
        _.get('/', indexContro.index());

        // 获取图书页
        _.get('/admin', indexContro.actionAdmin());

        // 添加图书页
        _.get('/addPage', indexContro.actionAddPage());
        _.post('/add', indexContro.actionAdd());

        // 修改图书页
        _.get('/editpage', indexContro.actionEditpage());
        _.post('/edit', indexContro.actionEdit());
        
        // 删除图书
        _.get('/deletepage', indexContro.actionDeletepage());

    }))
} */

/**
 * RESTful风格api
 * GET      http://localhost:8080/books         获取图书
 * POST     http://localhost:8080/books/book    添加图书
 * GET      http://localhost:8080/books/book/1  根据id获取图书
 * PUT      http://localhost:8080/books/book    编辑图书
 * DELETE   http://localhost:8080/books/book/1  删除图书
 */

// RESTful风格方式
module.exports = (app) => {
    // 返回页面
    app.use(router(_ => {
        _.get('/', indexContro.index());
        _.get('/es', indexContro.actionEs());
    }))

    // 返回接口
    app.use(router({ prefix: '/api' }, _ => {
        // 测试接口
        /* _.get('/test',ctx=>{
            ctx.body = "1111"
        }) */
        // 获取图书页
        _.get('/books', apiContro.actionAdmin());

        // 添加图书页
        _.post('/books/book', apiContro.actionAdd());

        // 修改图书页
        _.get('/books/book/:id', apiContro.actionEditpage());
        _.put('/books/book', apiContro.actionEdit());

        // 删除图书
        _.delete('/books/book/:id', apiContro.actionDeletepage());


    }))
}
