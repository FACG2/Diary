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
    t.equal(err, null, 'error should be null');
    t.ok(!err, 'user doesn\'t exist');
    t.end();
  });
});

test('passwords are being validated correctly - correct password', (t) =>
  validation.hashPassword('test', (err, hashedPw) => {
    t.equal(err, null, 'error should be null');
    validation.comparePasswords('test', hashedPw, (err, correct) => {
      t.equal(err, null, 'error should be null');
      t.equal(correct, true);
      t.end();
    });
  })
);
