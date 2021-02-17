var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("<h1>Hi I'm server 3</h1>")
  res.end();
}).listen(1111);

