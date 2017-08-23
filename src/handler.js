const fs = require('fs');
const path = require('path');
const qs = require('querystring');
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
      addUser(qs.parse(userData).username, qs.parse(userData).password, (err, response) => {
        if (err) {
          res.writeHead(406, {'content-type': 'text/plain'});
          res.end(err.message);
        } else {
          res.writeHead(200, {'content-type': 'text/plain',
            'Location': '/'});
          res.end('Sign Up success');
        }
      });
    });
  }
};

// login handler
const login = (req, res) => {
  console.log('dgg');
  const username = req.url.split('?')[1].split('=')[1]; // ///////??????
  checkUser(username, (err, list) => {
    if (err) {
      res.writeHead(500, {'content-type': 'text/plain'});
      res.end(err.message);
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
  signUpPage: signUpPage,
  signUp: signUp,
  login: login,
  creatDiary: creatDiary,
  showDiaries: showDiaries,
  notFound: notFound
};
