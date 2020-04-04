import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

let should = chai.should();
chai.use(chaiHttp);


describe('device test', function() {
  it('get device success', function (done) {
    let testDeviceID = 1;
    chai.request(app)
      .get('/device/' + testDeviceID)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.status.should.eql('ok');
        should.exist(res.body.device)
        done();
      });
  });
  
  it('get device fail', function (done) {
    let testDeviceID = 9999;
    chai.request(app)
      .get('/device/' + testDeviceID)
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
