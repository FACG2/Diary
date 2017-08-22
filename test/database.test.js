const test = require('tape');
const query = require('../src/queries.js');

// test addDiary
test('Testing the addDiary function Query', (t) => {
  query.addDiary('moaz', 'hey today is 20 Aug', '08-20-2017', (err, res) => {
    if (err) {
      t.notOk(err);
      console.log('ERRR');
    } else {
      query.checkDiary('moaz', (err, res) => {
        if (err) {
          t.notOk(res);
        } else {
          console.log(res);
          t.ok(res.length > 0);
        }
      });
    }
    t.end();
  });
});

// Test signUp Query
test('Testing the addUser function Query', (t) => {
  query.addUser('sohad', '222', (err, res) => {
    if (err) {
      t.notOk(err);
      // console.log('ERROR');
    } else {
      query.checkUser('sohad', (err, res) => {
        if (err) {
          t.notOk(res);
          // console.log('check Error');
        } else {
          t.deepEqual(res[0], {username: 'sohad', password: '222'}, 'should return an Object that contains username and password');
        }
      });
    }
    t.end();
  });
});
