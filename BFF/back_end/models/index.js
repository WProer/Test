const fs = require("fs");
const path = require("path");
const db = require("./SQLPromise.js");
const { reject } = require("lodash");

class SafeRequest {
    constructor() { }


    // 获取图书数据
    getData() {
        let sql = `SELECT * FROM book`;
        try {
            return db.query(sql)
        } catch (error) {
            console.log(error);
        }

    }


    // 添加图书数据
    async addData(opt) {
        let sql = `INSERT INTO book SET ?`;
        let data = opt;
        let result = {
            code: 0,
            message: "",
            data: []
        };
        try {
            let datas = await db.query(sql, data);
            if (datas.affectedRows > 0) {
                result.message = "添加成功";
                return Promise.resolve(result);
            } else {
                result.message = "添加失败";
                result.code = 1;
                return Promise.reject(result);
            }
        } catch (error) {
            result.message = "添加失败";
            result.code = 1;
            result.status = 500;
            return Promise.reject(result);
        }
    }

    // 获取修改的图书数据
    async getEditData(id) {
        let sql = `SELECT * FROM book WHERE id=?`;
        let data = id;
        let result = {
            code: 0,
            message: "",
            data: []
        };
        try {
            let datas = await db.query(sql, [data]);
            if (datas.length > 0) {
                result.message = "获取成功";
                result.data = datas[0];
                return Promise.resolve(result);
            } else {
                result.message = "获取失败";
                result.code = 1;
                return Promise.reject(result);
            }
        } catch (error) {
            result.message = "获取失败";
            result.code = 1;
            result.status = 500;
            return Promise.reject(result);
        }
    }
    // 修改图书信息
    async EditData(opt) {
        // console.log(opt);
        let sql = `UPDATE book SET name=?,author=?,category=?,description=? WHERE id=?`;

        let name = opt.name;
        let author = opt.author;
        let category = opt.category;
        let description = opt.description;
        let id = opt.id; 
        let result = {
            code: 0,
            message: "",
            data: []
        };
        try {
            let datas = await db.query(sql, [name,author,category,description,id]);
            if (datas.affectedRows > 0) {
                result.message = "修改成功";
                return Promise.resolve(result);
            } else {
                result.message = "修改失败";
                result.code = 1;
                return Promise.reject(result);
            }
        } catch (error) {
            result.message = "修改失败";
            result.code = 1;
            result.status = 500;
            return Promise.reject(result);
        }
    }


    // 删除图书
    async DeleteData(id) {
        let sql = `DELETE FROM book WHERE id=?`;
        let result = {
            code: 0,
            message: "",
            data: []
        };
        try {
            let datas = await db.query(sql, [id]);
            if (datas.affectedRows > 0) {
                result.message = "删除成功";
                return Promise.resolve(result);
            } else {
                result.message = "删除失败";
                result.code = 1;
                return Promise.reject(result);
            }
        } catch (error) {
            result.message = "删除失败";
            result.code = 1;
            result.status = 500;
            return Promise.reject(result);
        }
    }
}

module.exports = SafeRequest;