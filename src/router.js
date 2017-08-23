// const handler = require('./handler.js');
//
// function router (req, res) {
//   let url = req.url;
//
//   if (url === '/home' || url === '/') {
//     handler.handlerHome(req, res);
//   } else if (url === '/signup') {
//     handler.handlerSignUp(req, res);
//   } else {
//     handler.handlerNotFound(req, res);
//   }
// }
//
// module.exports = router;

const handlers = require('./handler.js');

const router = (req, res) => {
  const url = '/' + req.url.split('/')[1];
  let handle = {
    '/': handlers.home,
    '/public': handlers.publicHandler,
    '/signup': handlers.signUp,
    '/login': handlers.login,
    '/creatdiary': handlers.creatDiary,
    '/showdiary': handlers.showDiaries
  }[url];

  handle = handle || handlers.notFound;
  handle(req, res);
};

module.exports = router;
