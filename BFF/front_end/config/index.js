const path = require("path");
const _ = require("lodash");

let Config = {
    "staticDir": path.join(__dirname, "..", "assets"),
    "templateDir": path.join(__dirname, "..", "views")

}

if (process.env.NODE_ENV == "development") {
    let developmentPort = {
        port: 8080,
        baseURL : `http://localhost:8088`
    };
    _.assignIn(Config,developmentPort);
}

if (process.env.NODE_ENV == "production") {
    let productionPort = {
        port: 8000
    };
    _.assignIn(Config,productionPort);
}

module.exports = Config;