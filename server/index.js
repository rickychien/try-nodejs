var server = require('./server'),
    router = require('./router'),
    requestHandler = require('./requestHandler'),
    handle = {
      '/': requestHandler.start,
      '/start': requestHandler.start,
      '/upload': requestHandler.upload,
      '/show': requestHandler.show
    };

server.start(router.route, handle);