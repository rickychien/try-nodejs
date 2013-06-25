var Browser = require('zombie'),
    browser = new Browser(),
    assert = require('assert'),
    server = require('../server/server'),
    router = require('../server/router'),
    requestHandler = require('../server/requestHandler');

before(function() {
  var handle = {};
  handle["/"] = requestHandler.start;
  handle["/start"] = requestHandler.start;
  handle["/upload"] = requestHandler.upload;
  handle["/show"] = requestHandler.show;
  //server.start(router.route, handle);
});

suite('GET', function() {
  before(function() {
    this.browser = new Browser({ site: 'http://140.115.53.50:8888' });
  });

  suite('/', function() {
    beforeEach(function(done) {
      this.browser.visit('/', done);
    });

    test('should return request object', function() {
      assert.notEqual(undefined, server);
    });
  });
});
