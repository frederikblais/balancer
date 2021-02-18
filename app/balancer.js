var http = require('http');
var url = require("url");
var request = 0;
var line = '--------------------------------';

const servers = [
  'http://localhost:1111',
  'http://localhost:2222',
  'http://localhost:3333'
];

http.createServer(function (req, res) {
  var server_num = 0;
  res.writeHead(200, { "Content-Type": "text/html" });
  var p = url.parse(req.url, true).pathname;

  if (p == '/hello') {
    // send to different port
    request += 1;

    // At request #1 => send user to server 1111
    if (request == 1) {
      var server_num = 1;
      req_port(servers[0]);
    }

    // At request #2 => send user to server 2222
    else if (request == 2) {
      // redirrect to 2222
      var server_num = 2;
      req_port(servers[1]);
    }
      
    // At request #3 => send user to server 3333
    else if (request == 3) {
      // redirrect to 3333
      var server_num = 3;
      request = 0;
      req_port(servers[2]);
    }

    function req_port(address) {
      console.log("req port: "+address,server_num);
      var callingOtherServerRequest = http.request(address, function(response) {
        var str = '';
        //another chunk of data has been received, so append it to `str`
        response.on('data', function (chunk) {
          str += chunk;
        });
  
        //the whole response has been received, so we just print it out here
        response.on('end', function () {
          console.log(str);
          server_num += 1;
        });

      }).end();

      callingOtherServerRequest.on('error', function (e) {
        console.info("server " + address + " is not responding, forwarding you to the next server.");
        server_num += 1;
        redirrect(server_num);
      });
    }

    function redirrect(sn) {
      // redirrect to next responding server
      request += 1;
      console.log('before if :'+ sn);
      if (sn == 4) {
        sn = 0;
        req_port(servers[0]);
      }
      else {
        req_port(servers[sn]);
      }
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