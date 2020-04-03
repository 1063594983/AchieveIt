var expect = require('chai').expect;
var request = require('superagent');
var testBaseURL = require('./util').testBaseURL;

describe('login test', function() {
  it('login success', function (done) {
    request
      .post(testBaseURL + 'user/login')
      .send('{"username":"3","password":"3"}')
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        // console.log(res.body.status);
        expect(res.body.status).to.be.eql('ok');
        done();
      });
  });
  
  it('login fail', function (done) {
    request
      .post(testBaseURL + 'user/login')
      .send('{"username":"1","password":"2"}')
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        // console.log(res.body.status);
        expect(res.body.status).to.be.eql('error');
        done();
      })
  });
});
