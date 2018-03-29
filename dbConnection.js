var mysql=require('mysql');
var config = require('./configs');
var pool=mysql.createPool({
  connectionLimit : config.connectionLimit, //important
  host:config.host,
  port:config.port,
  user:config.user,
  password:config.password,
  database:config.database
});

var getConnection = function(callback) {
    pool.getConnection(function(err, connection) {
        callback(err, connection);
    });
};

module.exports = pool;