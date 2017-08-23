const fs = require('fs');
const path = require('path');
const { addUser, checkUser, checkDiary, addDiary } = require('./queries/queries.js');

const home = (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'public', 'home.html'), (err, data) => {
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
  req.on('data', (userChunck) => {
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
  const username = req.url.split('?')[1].split('=')[1]; // ///////??????
  checkUser(username, (err, list) => {
    if (err) {
      res.writeHead(500, {'content-type': 'text/plain'});
      res.end('Not Found');
    } else {
      res.writeHead(200, {'content-type': 'application/json'});
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
  signUp: signUp,
  login: login,
  creatDiary: creatDiary,
  showDiaries: showDiaries,
  notFound: notFound
};
