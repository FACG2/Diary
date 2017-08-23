const test = require('tape');
const query = require('../src/queries/queries.js');
const validation = require('../src/queries/validation.js');

// test addDiary
test('Testing the addDiary function Query', (t) => {
  query.addDiary('moaz', 'hey today is 20 Aug', '08-20-2017', (err, res) => {
    t.equal(err, null, 'error should be null');
    query.checkDiary('moaz', (err, res) => {
      if (err) {
        t.notOk(res);
      } else {
          // console.log(res);
        t.ok(res.length > 0);
      }
    });
    t.end();
  });
});

// Test signUp Query
test('Testing the addUser function Query', (t) => {
  query.addUser('sohad', '222', (err, res) => {
    t.equal(err, null, 'error should be null');
    query.checkUser('sohad', (err, res) => {
      t.equal(err, null, 'error should be null');
      t.equal(res[0].username, 'sohad', 'should return an Object that contains username and password');
      t.equal(res[0].password.substring(0, 4), '$2a$');
      t.end();
    });
  });
});

test('check users password', (t) => {
  validation.validatePassword('sohad', '222', (err, res) => {
    t.equal(err, null, 'error should be null');
    validation.validatePassword('sohad', '333', (err, res) => {
      t.equal(err.message, 'password isn\'t correct', 'should return a message');
      t.end();
    });
  });
});
