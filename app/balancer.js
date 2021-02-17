var http = require('http');
var url = require("url");
var request = 0
var line = '--------------------------------'

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
    request += 1;

    // At request #1 => send user to server 1111
    if (request == 1) {
      req_port(servers[0]);
      console.log(request)
    }

    // At request #2 => send user to server 2222
    else if (request == 2) {
      // redirrect to 2222
      req_port(servers[1]);
      console.log(request)
    }
      
    // At request #3 => send user to server 3333
    else if (request == 3) {
      // redirrect to 3333
      req_port(servers[2]);
      console.log(request)
    }
      
    // At request #4 => send user to server 1111 and reset request count to 1
    else {
      request = 1;
      req_port(servers[0]);
      console.log(request)
    }

    function req_port(address) {
      var callingOtherServerRequest = http.request(address, function(response) {
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

      callingOtherServerRequest.on('error', function (e) {
        console.info("server "+address+ " is not responding, forwarding you to the next server.");
        redirrect(address);
      });
    }

    function redirrect(address) {
      // redirrect to 2222
      var callingOtherServerRequest = http.request(address, function (response) {
        console.log(request);
        
        if (request == 0 || request == 1 || request == 2) {
            var str = '';
            //another chunk of data has been received, so append it to `str`
            response.on('data', function (chunk) {
            str += chunk;
          });
  
            //the whole response has been received, so we just print it out here
            response.on('end', function () {
            console.log(str);
          });
        }
        else if (request == 3){
          var str = '';
            //another chunk of data has been received, so append it to `str`
            response.on('data', function (chunk) {
              str += chunk;
          });
  
            //the whole response has been received, so we just print it out here
            response.on('end', function () {
            console.log(str);
          });
        }
  
      }).end();
  
      callingOtherServerRequest.on('error', function (e) {
        console.info("uh oh...");
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