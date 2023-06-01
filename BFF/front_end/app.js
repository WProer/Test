const Koa = require("koa");
const path = require("path");
const app = new Koa();

const Config = require("./config/index.js");

// 表单数据的处理（koa-body）
const {koaBody} = require("koa-body");
app.use(koaBody ());

// 错误日志
const log4js = require("log4js");
log4js.configure({
    appenders: { cheese: { type: "file", filename: "logs/cheese.log" } },
    categories: { default: { appenders: ["cheese"], level: "error" } },
});
const logger = log4js.getLogger("cheese");
// logger.error("Cheese is too ripe!");


// 错误处理(处理输入的地址不正确的错误)
const Error = require("./middlewares/index.js");
Error.error(app,logger);

// 静态文件
const KoaStatic = require("koa-static");
app.use(KoaStatic(Config.staticDir));
// app.use(KoaStatic(path.join(__dirname, "assets")));

// 开启路由
require("./controllers/index.js")(app);

//模板引擎
const render = require("koa-art-template");
render(app, {
    root: Config.templateDir,
    // root: path.join(__dirname, "views"),
    extname: ".html"

});

app.listen(Config.port, () => {
    console.log("Server is Running...");
});

// app.listen(8080, () => {
//     console.log("Server is Running...");
// });