const data = require('./data.json');
const db = require('./models/SQLPromise.js');

let str = `INSERT INTO book (name,author,category,description) VALUES `
let arr = data.map(item=>{
    return `("${item.name}","${item.author}","${item.category}","${item.desc}")`
});
let sql =str+ arr.join(',') + ";";
db.query(sql);