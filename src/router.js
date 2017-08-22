const handler = require('./handler.js');

function router (req, res) {
  let url = req.url;

  if (url === '/home' || url === '/') {
    handler.handlerHome(req, res);
  } else if (url === '/signup') {
    handler.handlerSignUp(req, res);
  } else {
    handler.handlerNotFound(req, res);
  }
}

module.exports = router;
