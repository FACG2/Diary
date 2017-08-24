const test = require('tape');
const shot = require('shot');
const router = require('../src/router.js');

test('Home route test', (t) => {
  shot.inject(router, {method: 'get', url: '/'}, (res) => {
    t.equal(res.statusCode, 200, 'respond with 200');
    t.end();
  });
});

test('Home Not Found test', (t) => {
  shot.inject(router, {method: 'get', url: '/public/ss'}, (res) => {
    t.equal(res.statusCode, 404, 'respond with 404');
    t.end();
  });
});

test('Public style route test', (t) => {
  shot.inject(router, {method: 'get', url: '/public/css/style-home.css'}, (res) => {
    t.equal(res.statusCode, 200, 'public respond with 200');
    t.end();
  });
});

test('Public js route test', (t) => {
  shot.inject(router, {method: 'get', url: '/public/js/index.js'}, (res) => {
    t.equal(res.statusCode, 200, 'public respond with 200');
    t.end();
  });
});
