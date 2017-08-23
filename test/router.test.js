const test = require('tape');
const shot = require('shot');
const router = require('../src/router.js');

test('Home rout returns a status code of 200', (t) => {
  shot.inject(router, {method: 'get', url: '/home'}, (res) => {
    t.equal(res.statusCode, 200, 'respond with 200');
    t.end();
  });
});

test('Home route returns a status code of 404', (t) => {
  shot.inject(router, {method: 'get', url: '/afsdfh'}, (res) => {
    t.equal(res.statusCode, 404, 'respond with 404');
    t.end();
  });
});

test('Sign up route returns a status code of 200', (t) => {
  shot.inject(router, {method: 'post', url: '/signup'}, (res) => {
    t.equal(res.statusCode, 200, 'respond with 200');
    t.end();
  });
});
