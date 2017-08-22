const dbConnection = require('./database/db_connection.js');

// signUp Query
const addUser = (username, password, cb) => {
  const sql = {
    text: 'INSERT INTO user (username, password) VALUES ($1, $2)',
    valuess: [username, password]
  };
  dbConnection.query(sql, (err, data) => {
    if (err) {
      cb(err);
    } else {
      cb(null, data);
    }
  });
};
// login Query

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
  addUser: addUser
};
