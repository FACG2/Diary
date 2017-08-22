const dbConnection = require('../database/db_connection.js');
const bcrypt = require('bcryptjs');

const hashPassword = (password, cb) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      cb(err);
    } else {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          cb(err);
        } else {
          cb(null, hash);
        }
      });
    }
  });
};

const comparePasswords = (password, hashedPassword, cb) => {
  bcrypt.compare(password, hashedPassword, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

const validatePassword = (username, password, cb) => {
  var sql = {
    text: 'SELECT password FROM users where username= $1',
    values: [password]
  };
  dbConnection.query(sql, (err, res) => {
    if (err) {
      cb({isError: true, message: 'username already exists'});
    } else {
      comparePasswords(password, res.rows[0], (err, res) => {
        if (err) {
          cb(err);
        } else {
          if (!res) {
            cb({isError: true, message: 'password isn\'t correct'});
          } else {
            cb({isError: true});
          }
        }
      });
    }
  });
};

const validateUserName = (username, cb) => {
  var sql = {
    text: 'SELECT * FROM users where username= $1',
    values: [username]
  };
  dbConnection.query(sql, (err, res) => {
    if (err) {
      cb({isError: true, message: err});
    } else {
      if (res.rows.length > 0) {
        cb({isError: true, message: 'username already exists'});
      } else {
        cb({isError: false});
      }
    }
  });
};

module.exports = {
  hashPassword,
  validatePassword,
  validateUserName
};
