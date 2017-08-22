const dbConnection = require('../database/db_connection.js');

const validatePassword = (username, password, cb) => {
  var sql = {
    text: 'SELECT password FROM users where username= $1',
    values: [password]
  };
  dbConnection.query(sql)
};
