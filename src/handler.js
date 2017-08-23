const fs = require('fs');
const path = require('path');
const { addUser, checkUser, checkDiary, addDiary } = require('./src/queries.js');
// const { hashPassword, comparePasswords, validatePassword, validateUserName } = require('./src/validation.js');
// // const queryString = require('querystring');
//
// // const contentType = {
// //   css: 'text/css',
// //   js: 'application/js',
// //   ico: 'image/x-icon',
// //   html: 'text/html'
// // };
//
// function handlerHome (req, res) {
//   fs.readFile(pathJoin(__dirname, '/../public/home.html'), (err, data) => {
//     if (err) {
//       res.writeHead(500, {'content-Type': 'text/html'});
//       res.end('something went error in home page');
//     } else {
//       res.writeHead(200, {'content-Type': 'text/html'});
//       res.end(data);
//     }
//   });
// }
//
// function handlerSignUp (req, res) {
//   fs.readFile(pathJoin(__dirname, '/../public/signup.html'), (err, data) => {
//     if (err) {
//       res.writeHead(500, {'content-type': 'text/html'});
//       res.end('something went error in signup page');
//     } else {
//       res.writeHead(200, {'content-Type': 'text/html'});
//       res.end(data);
//     }
//   });
// }
//
// function handlerNotFound (req, res) {
//   fs.readFile(pathJoin(__dirname, '/../public/notfound.html'), (err, data) => {
//     if (err) {
//       res.writeHead(500, {'content-type': 'text/html'});
//       res.end('something went error in not found page');
//     } else {
//       res.writeHead(200, {'content-Type': 'text/html'});
//       res.end(data);
//     }
//   });
// }
//
// module.exports = {
//   handlerHome,
//   handlerSignUp,
//   handlerNotFound
// };
const home = (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'public', 'index.html'), (err, data) => {
    if (err) {
      res.writeHead(404, {'content-type': 'text/plain'});
      res.end('Page Not Found');
    } else {
      res.writeHead(200, {'content-type': 'text/html'});
      res.end(data);
    }
  });
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

// sign up handler
const signUp = (req, res) => {
  let userData = '';
  req.on('user', (userChunck) => {
    userData += userChunck;
  });
  if (userData) {
    req.on('end', () => {
      userData = JSON.parse(userData);
      addUser(userData.username, userData.password, (err, res) => {
        if (err) {
          res.writeHead(404, {'content-type': 'text/plain'});
          res.end('Page Not Found');
        } else {
          if (res.check) {
            res.writeHead(200, {'content-type': 'application/json'});
            res.end('Sign Up success');
          } else {
            res.writeHead(404, {'content-type': 'text/plain'});
            res.end('Sign Up failed');
          }
        }
      });
    });
  }
};

// login handler
const login = (req, res) => {
  let data = '';
  req.on('data', (chunck) => {
    data += chunck;
  });
  req.end('end', () => {
    if (data) {
      data = JSON.parse(data);
      const username = ''; // ///////??????
      checkUser(data, (isExist) => {
        if (isExist) {
          checkDiary(username, (err, list) => {
            if (err) {
              res.writeHead(500, {'content-type': 'text/plain'});
              res.end('Not Found');
            } else {
              res.writeHead(200, {'content-type': 'application/json'});
              res.end(JSON.stringify(list));
            }
          });
        } else {
          res.writeHead(500, {'content-type': 'text/plain'});
          res.end('User Not Found');
        }
      });
    }
  });
};

// add diary handler
const creatDiary = (req, res) => {
  let addText = '';
  req.on('data', function (dataChunks) {
    addText += dataChunks;
  });
  if (addText) {
    req.on('end', () => {
      addText = JSON.parse(addText);
      addDiary(addText.username, addText.text, addText.date, (err, res) => {
        if (err) {
          res.writeHead(404, {'content-type': 'text/plain'});
          res.end('Page Not Found');
        } else {
          if (res.check) {
            res.writeHead(200, {'content-type': 'application/json'});
            res.end('Write diary success');
          } else {
            res.writeHead(404, {'content-type': 'text/plain'});
            res.end('Failed Write diary');
          }
        }
      });
    });
  } else {
    res.writeHead(404, {'content-type': 'text/plain'});
    res.end('Page Not Found');
  }
};

// preview diaries
const showDiaries = (req, res) => {
  let data = '';
  req.on('data', function (chunk) {
    data += chunk;
  });
  req.on('end', () => {
    if (data) {
      data = JSON.parse(data);
      const today = new Date().format('mm-dd');
      checkMemberCredits(data, (isExist) => {
        if (isExist) {
          checkDiary(diaries, (err, list) => {
            if (err) {
              res.writeHead(500, {'content-type': 'text/plain'});
              res.end('NOT Found');
            } else {
              res.writeHead(200, {'content-type': 'application/json'});
              res.end(JSON.stringify(list));
            }
          });
        } else {
          res.writeHead(500, {'content-type': 'text/plain'});
          res.end('Diaries Not Found');
        }
      });
    } else {
      res.writeHead(500, {'content-type': 'text/plain'});
      res.end('Diaries Not Found');
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
  signUp: signUp,
  login: login,
  creatDiary: creatDiary,
  showDiaries: showDiaries,
  notFound: notFound
};
