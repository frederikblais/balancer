var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("Hi I'm server 1")
  res.end();
}).listen(1111);
console.info("Server running ....");
