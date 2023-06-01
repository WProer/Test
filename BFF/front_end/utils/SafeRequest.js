const axios = require('axios');
const config = require('../config/index.js');
class SafeRequest {
    constructor(url) {
        this.baseURL = config.baseURL,
            this.url = url;
    }

    fetch(options) {
        let bookFech = axios.get(this.baseURL + this.url);

        if (options) {
            bookFech = axios({
                url: this.baseURL + this.url,
                method: options.method,
                data: options.params
            })
        }

        return new Promise((resolve, reject) => {
            let result = {
                code: 0,
                message: "Success",
                data: []
            }
            bookFech.then((msg) => {
                console.log(msg);
                if (msg.data.code === 0) {
                    result.data = msg.data.data;
                    result.message = msg.data.message;
                }else{
                    result.data = msg.data;
                }
                resolve(result);
                
            }).catch((err) => {
                result.code = 1;
                result.message = "Error(与后台通信失败)"
                reject(result);
            });
        })
    }
}

module.exports = SafeRequest