import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

let should = chai.should();
chai.use(chaiHttp);


describe('activity test', function() {
  it('get activity success', function (done) {
    let testActivityID = 2;
    chai.request(app)
      .get('/activity/' + testActivityID)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.status.should.eql('ok');
        should.exist(res.body.activity)
        done();
      });
  });
  
  it('get activity fail', function (done) {
    let testActivityID = 9999;
    chai.request(app)
      .get('/activity/' + testActivityID)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.status.should.eql('error');
        res.body.msg.should.eql('not found');
        should.not.exist(res.body.device)
        done();
      });
  });

});
