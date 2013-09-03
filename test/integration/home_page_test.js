/*jshint expr: true*/

var helper = require('../_helper.js')
  , expect = require('chai').expect
  , server, browser;

describe('Home Page', function() {

  before(function() {
    server  = helper.server();
    browser = helper.browser();
  });

  after(function(done) {
    server.close(done);
  });

  describe('content', function() {

    before(function(done) {
      browser.visit('/', done);
    });

    it('should have an <h1> title about Stargrin', function() {
      var title = browser.text('h1');
      expect(title).to.include('Stargrin');
    });

    it('should prompt visitors to sign up', function() {
      var msg = browser.text('body');
      expect(msg).to.include('Sign up');
    });

  }); // content

});
