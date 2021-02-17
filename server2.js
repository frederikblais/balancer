var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var q = url.parse(req.url, true).query;
  var result = factorial(parseInt(q.n)) 
  res.write("Result : " + result + "<br> Server 2")
  res.end();
}).listen(2222);

function factorial(n){
    var rval=1;
    for (var i = 2; i <= n; i++)
        rval = rval * i;
    return rval;
}