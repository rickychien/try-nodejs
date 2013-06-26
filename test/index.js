var Browser = require('zombie'),
    assert = require('assert'),
    server = require('../server/index');

suite('Index', function() {
  'use strict';

  suiteSetup(function() {
    this.browser = new Browser({ site: 'http://localhost:8888' });
  });

  suite('Visit /', function() {
    suiteSetup(function(done) {
      this.browser.visit('/', done);
    });

    test('return success status code 2xx', function() {
      assert.ok(this.browser.success);
    });

    test('contain a form', function() {
      assert.ok(this.browser.query('form'));
    });
  });

  suite('Visit /start', function() {
    suiteSetup(function(done) {
      this.browser.visit('/start', done);
    });

    test('return success status code 2xx', function() {
      assert.ok(this.browser.success);
    });

    test('contain a form', function() {
      assert.ok(this.browser.query('form'));
    });
  });

  suite('Visit /upload', function() {
    test('return success status code 2xx', function(done) {
      this.browser.visit('/upload', function() {
        assert.ok(this.browser.success);
        done();
      }.bind(this));
    });

    test('show an error message with directly visit', function(done) {
      this.browser.visit('/upload', function() {
        assert.equal(this.browser.text('body'), 'upload data error, please retry again.');
        done();
      }.bind(this));
    });

    test('test upload image', function(done) {
      this.browser.visit('/', function() {
        this.browser
          .attach('input[type=file]', '/tmp/test.jpg')
          .pressButton('input[type=submit]', function() {
            assert.equal(this.browser.location.pathname, '/upload');
            assert.ok(this.browser.query('img[src="/show"]'));
            done();
          }.bind(this));
      }.bind(this));
    });
  });
});
