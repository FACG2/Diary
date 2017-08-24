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
  console.log(password, hashedPassword);
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
    values: [username]
  };
  dbConnection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      if (res.rows.length === 0) {
        cb(new Error('user doens\'t exist'));
      } else {
        comparePasswords(password, res.rows[0].password, (err, res) => {
          if (err) {
            cb(err);
          } else {
            if (!res) {
              console.log(res);
              cb(new Error('password isn\'t correct'));
            } else {
              cb(null);
            }
          }
        });
      }
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
      cb(err);
    } else {
      if (res.rows.length > 0) {
        cb(new Error('username already exists'));
      } else {
        cb(null);
      }
    }
  });
};

module.exports = {
  hashPassword,
  validatePassword,
  validateUserName,
  comparePasswords
};
