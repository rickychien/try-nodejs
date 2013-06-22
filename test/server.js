var Browser = require('zombie');
var browser = new Browser();
var assert = require('assert');
var server = require('../server/server');

var url = "http://localhost:8888";

describe('GET', function() {
  describe('/', function() {
    it('should return request object', function() {
      browser.visit(url + "/");

      assert.notEqual(undefined, server);
    });
  });

  describe('/start', function() {
    it('should return request object', function() {
      browser.visit(url + "/");

      assert.notEqual(undefined, server);
    });
  });

  describe('/upload', function() {
    it('should return request object', function() {
      browser.visit(url + "/");

      assert.notEqual(undefined, server);
    });
  });

  describe('/show', function() {
    it('should return request object', function() {
      browser.visit(url + "/");

      assert.notEqual(undefined, server);
    });
  });
});

