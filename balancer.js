var http = require('http');

http.createServer(function (req, res) {
  //Call server 1 or 2 or 3
  res.end();
}).listen(9999);
console.info("Server running ....");