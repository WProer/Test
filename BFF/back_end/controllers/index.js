const router = require('koa-simple-router');
const IndexContro = require("./indexContro.js");
const indexContro = new IndexContro();

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
    app.use(router(_ => {
        _.get('/', indexContro.index());

        // 获取图书页
        _.get('/books', indexContro.actionAdmin());

        // 添加图书页
        _.post('/books/book', indexContro.actionAdd());

        // 修改图书页
        _.get('/books/book/:id', indexContro.actionEditpage());
        _.put('/books/book', indexContro.actionEdit());
        
        // 删除图书
        _.delete('/books/book/:id', indexContro.actionDeletepage());


        _.get('/es', indexContro.actionEs());
    }))
}
