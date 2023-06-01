const IndexBookModel = require("../models/index.js");
const indexBookModel = new IndexBookModel();

class APIContro {
    constructor() { }

    // 获取图书页
    actionAdmin() {
        let title = "图书管理系统"
        return async function (ctx) {
            let msg = await indexBookModel.getData();
            ctx.body = msg;
        }
    }

    // 添加图书
    actionAdd() {
        return async function (ctx) {
            //    console.log(ctx.request.body);
            try {
                let msg = await indexBookModel.addData(ctx.request.body);
                if (msg.code == 0) {
                    ctx.body = msg;
                } else {
                    ctx.body = "添加失败！"
                }
            } catch (error) {
                console.log(error);
            }

        }
    }


    // 修改图书页
    // 获取所需要修改图书的id
    actionEditpage() {
        return async function (ctx) {
            // let id = ctx.request.query.editid;
            let id = ctx.params.id;
            console.log(id);
            try {
                let getdata = await safeRequest.getEditData(id);
                //    console.log(getdata);
                ctx.body = getdata;
            } catch (error) {
                console.log(error);
            }

        }
    }
    // 修改图书信息
    actionEdit() {
        return async function (ctx) {
            //    console.log(ctx.request.body);
            try {
                let data = await safeRequest.EditData(ctx.request.body);
                ctx.body = data;
            } catch (error) {
                console.log(error);
            }


        }
    }

    // 删除图书
    actionDeletepage() {
        return async function (ctx) {
            let id = ctx.params.id;
            try {
                let data = await safeRequest.DeleteData(id);
                ctx.body = data;
            } catch (error) {
                console.log(error);
            }
        }
    };
}

module.exports = APIContro;