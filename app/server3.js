var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("Hi I'm server 3")
  res.end();
}).listen(3333);
console.info("Server running ....");

