const dbConnection = require('../database/db_connection.js');
const validation = require('./validation.js');

// signUp Query
const addUser = (username, passwor, cb) => {
  validation.validateUserName(username, (err) => {
    if (err) {
      cb(err);
    } else {
      validation.hashPassword(passwor, (err, hash) => {
        if (err) {
          cb(err);
        } else {
          const sql = {
            text: 'INSERT INTO users (username, password) VALUES ($1, $2)',
            values: [username, hash]
          };
          dbConnection.query(sql, (err, data) => {
            if (err) {
              cb(err);
            } else {
              cb(null, data);
            }
          });
        }
      });
    }
  });
};
// login Query
const checkUser = (username, password, cb) => {
  const sql = {
    text: 'SELECT * FROM users WHERE username= $1',
    values: [username]
  };
  // console.log(sql);
  dbConnection.query(sql, (err, data) => {
    if (err) {
      cb(err);
    } else {
      cb(null, data.rows);
    }
  });
};

// check diary
const checkDiary = (username, cb) => {
  const sql = {
    text: 'SELECT * FROM diary WHERE username=$1',
    values: [username]
  };
  dbConnection.query(sql, (err, data) => {
    if (err) {
      cb(err);
    } else {
      cb(null, data.rows);
    }
  });
};
// add diary Query
const addDiary = (username, text, date, cb) => {
  const sql = {
    text: 'INSERT INTO diary (username, text, date) VALUES ($1, $2, $3);',
    values: [username, text, date]
  };
  dbConnection.query(sql, (err, data) => {
    if (err) {
      cb(err);
    } else {
      cb(null, data.rows);
    }
  });
};

// test addQuery

module.exports = {
  addDiary: addDiary,
  addUser: addUser,
  checkUser: checkUser,
  checkDiary: checkDiary
};
