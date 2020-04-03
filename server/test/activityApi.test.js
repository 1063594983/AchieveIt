var expect = require('chai').expect;
var request = require('superagent');
var testBaseURL = require('./util').testBaseURL;

describe('activity test', function() {
  it('get activity success', function (done) {
    let testActivityID = 2;
    request
      .get(testBaseURL + 'activity/' + testActivityID)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        expect(res.body.status).to.be.eql('ok');
        expect(res.body.activity).to.not.be.empty;
        done();
      });
  });
  
  it('get activity fail', function (done) {
    let testActivityID = 9999;
    request
      .get(testBaseURL + 'activity/' + testActivityID)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        expect(res.body.status).to.be.eql('error');
        expect(res.body.msg).to.be.eql('not found');
        done();
      });
  });

});
