var expect = require('chai').expect;
var request = require('superagent');
var testBaseURL = require('./util').testBaseURL;

describe('risk test', function() {
  it('get risk success', function (done) {
    let testRiskID = 4;
    request
      .get(testBaseURL + 'risk/' + testRiskID)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        expect(res.body.status).to.be.eql('ok');
        expect(res.body.risk).to.not.be.empty;
        done();
      });
  });
  
  it('get risk fail', function (done) {
    let testRiskID = 9999;
    request
      .get(testBaseURL + 'risk/' + testRiskID)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        expect(res.body.status).to.be.eql('error');
        expect(res.body.msg).to.be.eql('not found');
        done();
      });
  });
  
});
