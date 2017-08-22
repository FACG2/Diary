const test = require('tape');
const query = require('../src/queries.js');

// test addDiary
test('Testing the addDiary function Query', (t) => {
  query.addDiary('sohad', 'my first diary', '12-05-2017', (err, res) => {
    if (err) {
      t.notOk(err);
    } else {
      t.equal(res, 'should return an Object that contains text diary');
      t.end();
    }
  });
});

// Test signUp Query
test('Testing the addUser function Query', (t) => {
  query.addUser('Abdallah', '*****', (err, res) => {
    if (err) {
      t.notOk(err);
    } else {
    }
  });
});
