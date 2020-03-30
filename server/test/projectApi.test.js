var expect = require('chai').expect;
var request = require('superagent');
var testBaseURL = require('./util').testBaseURL;

describe('project test', function() {
  it('get project success', function (done) {
    let testProjectID = 123;
    request
      .get(testBaseURL + 'project/' + testProjectID)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        expect(res.body.status).to.be.eql('ok');
        expect(res.body.project).to.not.be.empty;
        done();
      });
  });
  
  it('get project fail', function (done) {
    let testProjectID = 9999;
    request
      .get(testBaseURL + 'project/' + testProjectID)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        expect(res.body.status).to.be.eql('error');
        expect(res.body.project).to.be.empty;
        done();
      });
  });

});
