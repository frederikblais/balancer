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

  // apply the function on /hello
  if (p == '/hello') {

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

    // Function to check if the server respond
    // if true -> req server, res str
    // else -> req next server (ind == index + 1)
    //
    // two var: ind, index -> needed to fix the server 3 not responding bug.
    function req_server(ind) {
      if(ind == 3){
        index = 0;
      }
      
      // If server respond -> send request
      var callingOtherServerRequest = http.request(servers[ind], function (response) {
        var str = '';
        //another chunk of data has been received, so append it to `str`
        response.on('data', function (chunk) {
          str += chunk;
        });
      
        //the whole response has been received, so we just print it out here
        response.on('end', function () {
          console.log(str);
        });

      }).end();

      // If server does not respond -> send request to next server
      callingOtherServerRequest.on('error', function (e) {
        if (ind >= 3 || index >= 3) {
          ind = 0;
          index = 1;
          req_server(ind);
        }
        else {
          ind += 1;
          index += 1;
          req_server(ind);
        }
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