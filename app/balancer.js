var http = require('http');
var url = require("url");
var index = 0;
var line = '--------------------------------';

const servers = [
  'http://localhost:1111',
  'http://localhost:2222',
  'http://localhost:3333'
];

http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  var p = url.parse(req.url, true).pathname;

  if (p == '/hello') {
    // send to different port

    if(index == 3){
      index = 0;
    }

    // At index 0 => send user to server 1111
    if (index == 0) {
      req_server(index);
    }

    // At index 1 => send user to server 2222
    else if (index == 1) {
      // redirrect to 2222
      req_server(index);
    }
      
    // At index 2 => send user to server 3333
    else if (index == 2) {
      // redirrect to 3333
      req_server(index);
    }

    index += 1;
    console.log('new index = '+index)

    function req_server(index) {
      if(index == 3){
        index = 0;
      }
      console.log('index =  ',index)
      var callingOtherServerRequest = http.request(servers[index], function (response) {
        var str = '';
        //another chunk of data has been received, so append it to `str`
        response.on('data', function (chunk) {
          str += chunk;
        });
      
        //the whole response has been received, so we just print it out here
        response.on('end', function () {
          console.log(servers[index]);
          console.log(str);
          console.log('');
        });

      }).end();

      callingOtherServerRequest.on('error', function (e) {
        console.info(servers[index], " is not responding");
        console.log('');
        index += 1;
        req_server(index);
      });
    }
  }
  // Error handling for unknown paths
  else {
    res.writeHead(404, { "Content-Type": "text/html" });
    console.log("Path unknown.");
    res.end("Path unknown.");
  }
  res.end();
}).listen(9999);
console.info("Server running ....");
console.info("http://localhost:9999/hello");
console.log(line);