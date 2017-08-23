const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const { sign, verify } = require('jsonwebtoken');
const cookie = require('cookie');
const SECRET = 'Where Am I?';
const { addUser, checkDiary, addDiary } = require('./queries/queries.js');
const {validatePassword} = require('./queries/validation.js');

const home = (req, res) => {
  if (req.headers.cookie) {
    const token = cookie.parse(req.headers.cookie).jwt;
    verify(token, SECRET, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        diary(req, res);
      }
    });
  } else {
    fs.readFile(path.join(__dirname, '..', 'public', 'home.html'), (err, data) => {
      if (err) {
        notFound(req, res);
      } else {
        res.writeHead(200, {'content-type': 'text/html'});
        res.end(data);
      }
    });
  }
};

const diary = (req, res) => {
  if (req.headers.cookie) {
    const token = cookie.parse(req.headers.cookie).jwt;
    verify(token, SECRET, (err, result) => {
      if (err) {
        home(req, res);
      } else {
        fs.readFile(path.join(__dirname, '..', 'public', 'diary.html'), (err, data) => {
          if (err) {
            res.writeHead(404, {'content-type': 'text/plain'});
            res.end('Page Not Found');
          } else {
            res.writeHead(200, {'content-type': 'text/html',
              'Set-Cookie': `jwt=${token.username}; HttpOnly`});
            res.end(data);
          }
        });
      }
    });
  } else {
    home(req, res);
  }
};

const publicHandler = (req, res) => {
  let ext = req.url.split('.')[1];
  fs.readFile(path.join(__dirname, '..', req.url), (error, data) => {
    if (error) {
      res.writeHead(404, {'content-type': 'text/plain'});
      res.end('Page Not Found');
    } else {
      res.writeHead(200, {'content-type': 'text/' + ext});
      res.end(data);
    }
  });
};

const signUpPage = (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'public', 'signup.html'), (err, data) => {
    if (err) {
      res.writeHead(404, {'content-type': 'text/plain'});
      res.end('Page Not Found');
    } else {
      res.writeHead(200, {'content-type': 'text/html'});
      res.end(data);
    }
  });
};

// sign up handler
const signUp = (req, res) => {
  let userData = '';
  req.on('data', (userChunck) => {
    userData += userChunck;
  });
  if (userData !== undefined) {
    req.on('end', () => {
      var data = qs.parse(userData);
      addUser(data.username, data.password, (err, response) => {
        if (err) {
          res.writeHead(406, {'content-type': 'text/plain'});
          res.end(err.message);
        } else {
          var userDetails = {
            'username': data.username,
            'loggedin': true
          };
          const cookie = sign(userDetails, SECRET);
          res.writeHead(200, {'content-type': 'text/plain',
            'Location': '/',
            'Set-Cookie': `jwt=${cookie}; HttpOnly`});
          res.end('Sign Up success');
        }
      });
    });
  }
};

// login handler
const login = (req, res) => {
  var data = qs.parse(req.url.split('?')[1]);
  console.log(data);
  validatePassword(data.username, data.password, (err, list) => {
    if (err) {
      res.writeHead(500, {'content-type': 'text/plain'});
      res.end(err.message);
    } else {
      var userDetails = {
        'username': data.username,
        'loggedin': true
      };
      const cookie = sign(userDetails, SECRET);

      res.writeHead(200, {'content-type': 'application/json',
        'Set-Cookie': `jwt=${cookie}; HttpOnly
        Location:`
      });
      res.end(JSON.stringify(list));
    }
  });
};

// add diary handler
const creatDiary = (req, res) => {
  let addText = '';
  req.on('data', function (dataChunks) {
    addText += dataChunks;
  });
  req.on('end', () => {
    console.log(addText);
    addText = JSON.parse(addText);
    addDiary(addText['username'], addText['text'], addText['date'], (err, data) => {
      if (err) {
        console.log(err);
        res.writeHead(500, {'content-type': 'application/json'});
        res.end('Internal server error');
      } else {
        res.writeHead(200, {'content-type': 'application/json'});
        res.end(JSON.stringify(data));
      }
    });
  });
};

// preview diaries
const showDiaries = (req, res) => {
  var username = req.url.split('?')[1].split('=')[1];
  checkDiary(username, (err, list) => {
    // console.log('checkDiary');
    if (err) {
      res.writeHead(500, {'content-type': 'text/plain'});
      res.end('Not Found');
    } else {
      res.writeHead(200, {'content-type': 'application/json'});
      res.end(JSON.stringify(list));
    }
  });
};

const notFound = (req, res) => {
  res.writeHead(404, {'content-type': 'text/plain'});
  res.end('Page Not Found');
};

// exports
module.exports = {
  home: home,
  publicHandler: publicHandler,
  diary: diary,
  signUpPage: signUpPage,
  signUp: signUp,
  login: login,
  creatDiary: creatDiary,
  showDiaries: showDiaries,
  notFound: notFound
};
