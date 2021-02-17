var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var q = url.parse(req.url, true).query;
  var result = setTimeout(factorial(parseInt(q.n)), 3000); 
  res.write("Result : " + result + "<br> Server 1")
  res.end();
}).listen(1111);

function factorial(n){
    var rval=1;
    for (var i = 2; i <= n; i++)
        rval = rval * i;
    return rval;
}