var Browser = require('zombie');
var browser = new Browser();
var assert = require('assert');
var server = require('../server/server');

var url = "http://localhost:8888";

suite('GET', function() {
  suite('/', function() {
    test('should return request object', function() {
      browser.visit(url + "/");

      assert.notEqual(undefined, server);
    });
  });
});

