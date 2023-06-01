const SafeRequest = require('../utils/SafeRequest.js');

// 图书的数据模型
class IndexBookModel {
    constructor() { }


    // 获取图书数据
    getData() {
        let safeRequest = new SafeRequest('/books');
        return safeRequest.fetch();
    }


    // 添加图书数据
    // 通过postman接口测试工具发送数据
    /* { "name": "通过postman发送的数据",
     "author": "第一作者",
      "category": "测试数据", 
      "description": "这是通过postman发送的测试的数据" 
    } 
    数据发送成功
    */
    addData(opt) {
        let safeRequest = new SafeRequest('/books/book');
        return safeRequest.fetch({
            method: "POST",
            params: opt
        });
    }

    // 获取修改的图书数据
    getEditData(id) {

    }
    // 修改图书信息
    EditData(opt) {

    }


    // 删除图书
    DeleteData(id) {

    }
}

module.exports = IndexBookModel;