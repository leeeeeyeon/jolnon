const mysql = require('mysql');

// const dbConfig = {
//     connectionLimit: 20,
//     host: '',
//     user: '',
//     password: '',
//     database: ''
//   };
// const db = mysql.createPool(dbConfig);

const db = mysql.createConnection({
    connectionLimit: 20,
    host:'localhost',
    user:'root',
    password:'111111',
    database:'jolnon'
  });

module.exports = db;