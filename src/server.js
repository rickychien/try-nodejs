var http = require('http'),
    url = require('url');

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    route(handle, pathname, response, request);
  }

  http.createServer(onRequest).listen(8888);
  console.warn('Server has started at localhost:8888...');
}

exports.start = start;