const query = require('../src/queries.js');

// test addDiary
test('Testing the addDiary function Query', (t) => {
  addDiary('sohad', 'my first diary', '12-05-2017', (err, res) => {
    if (err) {
      t.notOk(err);
    } else {
      const data = query.addDiary;
      t.equal(data, 'should return an Object that contains text diary');
      t.end();
    }
  });
});

// Test signUp Query
test('Testing the addUser function Query', (t) => {
  addUser('Abdallah', '*****', (err, res) => {
    if (err) {
      t.notOk(err);
    } else {
      const data = query.addUser;
    }
  });
});
