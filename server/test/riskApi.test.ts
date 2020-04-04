// var expect = require('chai').expect;
// var request = require('superagent');
// var testBaseURL = require('./util').testBaseURL;

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

let should = chai.should();
chai.use(chaiHttp);


describe('risk test', function() {
  it('get risk success', function (done) {
    let testRiskID = 4;
    chai.request(app)
      .get('/risk/' + testRiskID)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.status.should.eql('ok');
        should.exist(res.body.risk)
        done();
      });
  });
  
  it('get risk fail', function (done) {
    let testRiskID = 9999;
    chai.request(app)
      .get('/risk/' + testRiskID)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.status.should.eql('error');
        res.body.msg.should.eql('not found');
        should.not.exist(res.body.risk)
        done();
      });
  });
  
});
