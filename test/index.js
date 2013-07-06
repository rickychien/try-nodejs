var Browser = require('zombie'),
  assert = require('assert'),
  server = require('../src/index'),
  fs = require('fs');

suite('Index', function() {
  'use strict';

  suiteSetup(function() {
    this.browser = new Browser({
      site: 'http://localhost:8888'
    });
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
        assert.equal(this.browser.text('body'), 'upload file error, please retry again.');
        done();
      }.bind(this));
    });

    test('upload image', function(done) {
      var self = this;
      this.browser.visit('/', function() {
        self.browser
        .attach('input[type=file]', 'test/test.jpg')
        .pressButton('input[type=submit]', function() {
          assert.equal(self.browser.location.pathname, '/upload');
          assert.ok(self.browser.query('img[src="/show"]'));
          done();
        });
      });
    });

    test('upload without image file', function(done) {
      var self = this;
      this.browser.visit('/', function() {
        self.browser
        .pressButton('input[type=submit]', function() {
          fs.renameSync("/tmp/test.jpg", "/tmp/modify.jpg");
          assert.equal(self.browser.location.pathname, '/upload');
          assert.equal(self.browser.text('body'), 'upload file error, please ensure to upload an image.');
          done();
        });
      });
    });
  });

  suite('Visit /unknown', function() {
    test('return fail status code 404 not found', function(done) {
      this.browser.visit('/unknown', function() {
        assert.equal(this.browser.statusCode, 404);
        done();
      }.bind(this));
    });
  });
});