const handlers = require('./handler.js');
var url;

const router = (req, res) => {
  if (req.url.includes('?')) {
    url = req.url.split('?')[0];
  } else {
    url = '/' + req.url.split('/')[1];
  }

  let handle = {
    '/': handlers.home,
    '/public': handlers.publicHandler,
    '/signUp': handlers.signUp,
    '/signUpPage': handlers.signUpPage,
    '/login': handlers.login,
    '/creatdiary': handlers.creatDiary,
    '/showdiary': handlers.showDiaries,
    '/diary': handlers.diary,
    '/logout': handlers.logout
  }[url];

  handle = handle || handlers.notFound;
  handle(req, res);
};

module.exports = router;
