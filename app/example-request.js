var http = require('http');

var callingOtherServerRequest = http.request("http://localhost:1111", function(response) {
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
    console.info("server is not responding");
  });
  