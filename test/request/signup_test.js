/*jshint expr: true*/

// var expect  = require('chai').expect
var request = require('supertest')
  , helper  = require('../_helper.js')
  , app     = helper.app
  , server;

describe('signup', function() {

  before(function() {
    server  = helper.server();
  });

  after(function(done) {
    server.close(done);
  });

  describe('POST /signup', function() {

    it('returns 200 when given a valid email address', function(done) {
      request(app)
        .post('/signup')
        .send({ email: 'test@lacroixdesign.net', list: 'b84ea03411' })
        .expect(200, done);
    });

    it('returns 400 when given an already subscribed email address', function(done) {
      request(app)
        .post('/signup')
        .send({ email: 'michael@lacroixdesign.net', list: 'b84ea03411' })
        .expect(400, done);
    });

  });

});
