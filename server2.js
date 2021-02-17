var http = require('http');

http.createServer(function (req, res) {
  console.info("Request received");
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("Hi I'm server 2")
  res.end();
}).listen(1111);
