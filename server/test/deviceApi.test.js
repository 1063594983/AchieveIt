var expect = require('chai').expect;
var request = require('superagent');
var testBaseURL = require('./util').testBaseURL;

describe('device test', function() {
  it('get device success', function (done) {
    let testDeviceID = 1;
    request
      .get(testBaseURL + 'device/' + testDeviceID)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        expect(res.body.status).to.be.eql('ok');
        expect(res.body.device).to.not.be.empty;
        done();
      });
  });
  
  it('get device fail', function (done) {
    let testDeviceID = 9999;
    request
      .get(testBaseURL + 'device/' + testDeviceID)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        expect(res.body.status).to.be.eql('error');
        expect(res.body.device).to.be.empty;
        done();
      });
  });

});
