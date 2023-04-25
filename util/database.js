// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('node-basics','root','mysql',{
//     dialect:'mysql', host:'localhost'
// });

// module.exports = sequelize;





const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database:'node-shop',
    password:'Root123!'
});

module.exports = pool.promise();