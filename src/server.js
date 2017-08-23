const http = require('http');
const router = require('./router.js');

const PORT = process.env.PORT || 4000;
const server = http.createServer(router);

server.listen(PORT, () => {
  console.log('Server is running at ' + PORT);
});
