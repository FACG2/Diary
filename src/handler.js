const fs = require('fs');
const pathJoin = require('path.join');
// const queryString = require('querystring');

// const contentType = {
//   css: 'text/css',
//   js: 'application/js',
//   ico: 'image/x-icon',
//   html: 'text/html'
// };

function handlerHome (req, res) {
  fs.readFile(pathJoin(__dirname, '/../public/home.html'), (err, data) => {
    if (err) {
      res.writeHead(500, {'content-Type': 'text/html'});
      res.end('something went error in home page');
    } else {
      res.writeHead(200, {'content-Type': 'text/html'});
      res.end(data);
    }
  });
}

function handlerSignUp (req, res) {
  fs.readFile(pathJoin(__dirname, '/../public/signup.html'), (err, data) => {
    if (err) {
      res.writeHead(500, {'content-type': 'text/html'});
      res.end('something went error in signup page');
    } else {
      res.writeHead(200, {'content-Type': 'text/html'});
      res.end(data);
    }
  });
}

function handlerNotFound (req, res) {
  fs.readFile(pathJoin(__dirname, '/../public/notfound.html'), (err, data) => {
    if (err) {
      res.writeHead(500, {'content-type': 'text/html'});
      res.end('something went error in not found page');
    } else {
      res.writeHead(200, {'content-Type': 'text/html'});
      res.end(data);
    }
  });
}

module.exports = {
  handlerHome,
  handlerSignUp,
  handlerNotFound
};
