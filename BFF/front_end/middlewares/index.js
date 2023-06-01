const middlewares = {
    error(app, logger) {
        app.use(async (ctx, next) => {
            await next();
            if (ctx.status != 404) {
                return
            }
            ctx.status = 200;
            ctx.body = `<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>`;
        })

        app.use(async (ctx, next) => {
            try {
                await next();

            } catch (error) {
                console.log(error);
                ctx.status = 500;
                ctx.body = "页面出错啦！！！"
                logger.error(error);
            }
        })
    }
}

module.exports = middlewares;