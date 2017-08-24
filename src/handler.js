const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const { sign, verify } = require('jsonwebtoken');
const cookie = require('cookie');
const SECRET = 'Where Am I?';
const { addUser, checkDiary, addDiary } = require('./queries/queries.js');
const {validatePassword} = require('./queries/validation.js');

const home = (req, res) => {
  console.log(req.headers.cookie);
  if (req.headers.cookie) {
    console.log(req.headers.cookie);
    const token = cookie.parse(req.headers.cookie).jwt;
    verify(token, SECRET, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        var userDetails = {
          'username': result.username,
          'loggedin': result.loggedin
        };
        const cookie = sign(userDetails, SECRET);
        res.writeHead(302, {'content-type': 'text/plain',
          'Location': '/diary',
          'Set-Cookie': `jwt=${cookie};  username=${result.username}`});
        res.end();
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

const logout = (req, res) => {
  res.writeHead(302, {'content-type': 'text/plain',
    'Location': '/',
    'Set-Cookie': `jwt=0; username=0; Max-Age=0`});
  res.end();
};

const diary = (req, res) => {
  if (req.headers.cookie) {
    const token = cookie.parse(req.headers.cookie).jwt;
    verify(token, SECRET, (err, result) => {
      if (err) {
        res.writeHead(302, {'content-type': 'text/html',
          'Location': '/' });
        res.end();
      } else {
        fs.readFile(path.join(__dirname, '..', 'public', 'diary.html'), (err, data) => {
          if (err) {
            res.writeHead(404, {'content-type': 'text/plain'});
            res.end('Page Not Found');
          } else {
            res.writeHead(200, {'content-type': 'text/html',
              'Set-Cookie': `username=${result.username}`});
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
          res.writeHead(302, {'content-type': 'text/plain',
            'Location': '/',
            'Set-Cookie': `jwt=${cookie}`});
          res.end();
        }
      });
    });
  }
};

// login handler
const login = (req, res) => {
  let userLog = '';
  req.on('data', (userChunck) => {
    userLog += userLog;
  });
  if (userLog !== undefined) {
    req.on('end', () => {
      var data = qs.parse(req.url.split('?')[1]);
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
          res.setHeader('Set-Cookie', `jwt=${cookie}; username=${data.username} Max-Age:100000`);
          res.writeHead(302, {'content-type': 'application/json',
            'Location': '/diary'});
          res.end(JSON.stringify(list));
        }
      });
    });
  }
};

// add diary handler
const creatDiary = (req, res) => {
  let addText = '';
  req.on('data', function (dataChunks) {
    addText += dataChunks;
  });
  req.on('end', () => {
    var data = qs.parse(addText);
    addDiary(data.username, data.text, data.date, (err, data) => {
      if (err) {
        console.log(err);
        res.writeHead(500, {'content-type': 'application/json'});
        res.end(JSON.stringify({error: 'Internal server error'}));
      } else {
        res.writeHead(200, {'content-type': 'application/json'});
        res.end(JSON.stringify(data));
      }
    });
  });
};

// preview diaries
const showDiaries = (req, res) => {
  if (req.headers.cookie) {
    const token = cookie.parse(req.headers.cookie).jwt;
    verify(token, SECRET, (err, result) => {
      if (err) {
        res.writeHead(500, {'content-type': 'text/plain'});
        res.end('Internal server error');
      } else {
        checkDiary(result.username, (err, list) => {
          if (err) {
            res.writeHead(500, {'content-type': 'text/plain'});
            res.end('Internal server error');
          } else {
            res.writeHead(200, {'content-type': 'application/json'});
            res.end(JSON.stringify(list));
          }
        });
      }
    });
  }
};

const showDiariesPage = (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'public', 'diary.html'), (err, data) => {
    if (err) {
      res.writeHead(404, {'content-type': 'text/plain'});
      res.end('Page Not Found');
    } else {
      res.writeHead(200, {'content-type': 'text/html'});
      res.end(data);
    }
  });
};

const notFound = (req, res) => {
  // res.writeHead(404, {'content-type': 'text/plain'});
  // res.end('Page Not Found');
  fs.readFile(path.join(__dirname, '..', 'public', 'notfound.html'), (err, data) => {
    if (err) {
      res.writeHead(404, {'content-type': 'text/plain'});
      res.end('Page Not Found');
    } else {
      res.writeHead(200, {'content-type': 'text/html'});
      res.end(data);
    }
  });
};

/*
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
*/
// exports
module.exports = {
  home: home,
  publicHandler: publicHandler,
  diary: diary,
  logout: logout,
  signUpPage: signUpPage,
  signUp: signUp,
  login: login,
  creatDiary: creatDiary,
  showDiaries: showDiaries,
  notFound: notFound,
  showDiariesPage: showDiariesPage
};
