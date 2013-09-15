/*jshint expr: true*/

var helper = require('../_helper.js')
  , expect = require('chai').expect
  , server, browser, $form;

describe('Signup Form', function() {

  before(function(done) {
    server  = helper.server();
    browser = helper.browser();
    $form   = 'form#signup-form';
    $inputElement   = $form+' input[type="email"]';
    $buttonElement  = $form+' button[type="submit"]';
    $errorElement   = $form+' #signup-form-error';
    $suggestElement = $form+' #signup-form-suggestion';
    $successElement = $form+' #signup-form-success';
    browser.visit('/', done);
  });

  after(function(done) {
    server.close(done);
  });

  describe('content', function() {

    it('should have a signup form', function() {
      var form = browser.query($form);
      expect(form).to.exist;
    });

    it('should have an email input', function() {
      var input = browser.query($inputElement);
      expect(input).to.exist;
    });

    it('should have a submit button', function() {
      var button = browser.query($buttonElement);
      expect(button).to.exist;
    });

  }); // content

  describe('validations', function() {

    beforeEach(function(done) {
      browser.visit('/', done);
    });

    it('should provide an error message for blank email addresses', function(done) {
      expect( browser.query($errorElement), 'email required error should NOT exist' ).to.not.exist;
      browser.pressButton($buttonElement, function() {
        expect( browser.query($errorElement), 'email required error should exist' ).to.exist;
        expect( browser.text($errorElement), 'email required error should include text' ).to.include('required');
        done();
      });
    });

    it('should provide an error message for invalid email addresses', function(done) {
      function queryError() { return browser.query($errorElement); }
      expect( queryError(), 'invalid email error should NOT exist when blank' ).to.not.exist;
      browser.fill($inputElement, 'example');
      browser.wait(10, function() {
        expect( queryError(), 'invalid email error should NOT exist before submit' ).to.not.exist;
        browser.pressButton($buttonElement, function() {
          expect( queryError(), 'invalid email error should exist' ).to.exist;
          expect( browser.text($errorElement) ).to.include('Invalid email');
          done();
        });
      });
    });

    it('should suggest commonly mistyped domain names', function(done) {
      expect( browser.query($suggestElement), 'email suggestion should NOT exist' ).to.not.exist;
      browser.fill($inputElement, 'example@gnail.com');
      browser.wait(10, function() {
        expect( browser.query($suggestElement), 'email suggestion should exist' ).to.exist;
        expect( browser.text($suggestElement) ).to.include('example@gmail.com');
        browser.clickLink($suggestElement, function() {
          expect( browser.html($inputElement) ).to.include('example@gmail.com');
          done();
        });
      });
    });

    it('should provide a success message when complete', function(done) {
      function querySuccess() { return browser.query($successElement); }
      expect( querySuccess(), 'success msg should NOT exist before complete' ).to.not.exist;
      browser.fill($inputElement, 'test@lacroixdesign.net');
      browser.pressButton($buttonElement, function() {
        expect( querySuccess(), 'success msg should exist when complete' ).to.exist;
        expect( browser.text($successElement) ).to.include('Almost done!');
        done();
      });
    });

    it('should provide an error message when already subscribed', function(done) {
      function queryError() { return browser.query($errorElement); }
      expect( queryError(), 'already exists error msg should NOT exist before complete' ).to.not.exist;
      browser.fill($inputElement, 'michael@lacroixdesign.net');
      browser.pressButton($buttonElement, function() {
        expect( queryError(), 'already exists error msg should exist when complete' ).to.exist;
        expect( browser.text($errorElement) ).to.include('already');
        done();
      });
    });

  }); // validations

});
