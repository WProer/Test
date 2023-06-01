class IndexContro {
    constructor() {}

    index() {
        let data = {
            msg: "图书馆首页"
        }
        return async function (ctx) {
            await ctx.render("index", {
                data
            });
        }
    }

    actionEs() {
        return async function (ctx) {
            await ctx.render('es', {});
        }
    }

    // 添加图书页
    actionAddPage() {
        let msg = "添加图书页"
        return async function (ctx) {
            await ctx.render("addpage", {
                msg
            });
        }
    }



}

module.exports = IndexContro;