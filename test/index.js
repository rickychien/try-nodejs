var Browser = require('zombie'),
    browser = new Browser(),
    assert = require('assert'),
    server = require('../server/index');

suite('GET', function() {
  before(function() {
    this.browser = new Browser({ site: 'http://localhost:8888' });
  });

  suite('/', function() {
    beforeEach(function(done) {
      this.browser.visit('/', done);
    });

    test('should return success status code 2xx', function() {
      assert.ok(this.browser.success);
    });

    test('should contain a form', function() {
      assert.ok(this.browser.query('form'));
    });
  });

  suite('/start', function() {
    beforeEach(function(done) {
      this.browser.visit('/start', done);
    });

    test('should return success status code 2xx', function() {
      assert.ok(this.browser.success);
    });

    test('should contain a form', function() {
      assert.ok(this.browser.query('form'));
    });
  });
});
