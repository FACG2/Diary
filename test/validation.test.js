var test = require('tape');
var validation = require('../src/queries/validation.js');

test('password is being hashed correctly', (t) =>
  validation.hashPassword('wehey', (err, res) => {
    t.equal(err, null, 'error should be null');
    t.equal(res.substring(0, 4), '$2a$');
    t.end();
  })
);
test('check username exists', (t) => {
  validation.validateUserName('Abdallah', (err) => {
    if (err.isError) {
      console.log(err.message);
    } else {
      var actual = err.isError;
      var expected = false;
      t.equal(actual, expected, 'user doesn\'t exist');
      t.end();
    }
  });
});
