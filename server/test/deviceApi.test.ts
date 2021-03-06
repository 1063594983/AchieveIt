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


describe('insert device test', function() {
  it('insert device success', function (done) {
    chai.request(app)
      .post('/device')
      .send({
        "device_name": "device_name test",
        "device_status": "device_status test"
      })
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.status.should.eql('ok');
        res.body.msg.should.eql('insert success');
        done();
      });
  });
});

describe('update device test', function() {
  it('update device success', function (done) {
    let testdeviceID = 2;
    chai.request(app)
      .put('/device/' + testdeviceID)
      .send({
        "device_name": "device_name test2",
        "device_status": "device_status test2"
      })
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.status.should.eql('ok');
        res.body.msg.should.eql('update success');
        done();
      });
  });
});

describe('delete device test', function() {
  it('delete device success', function (done) {
    let testdeviceID = 5;
    chai.request(app)
      .delete('/device/' + testdeviceID)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.status.should.eql('ok');
        res.body.msg.should.eql('delete success');
        done();
      });
  });

  
  // it('delete device fail', function (done) {
  //   let testdeviceID = 9999;
  //   chai.request(app)
  //     .delete('/device/' + testdeviceID)
  //     .set('Content-Type', 'application/json')
  //     .end(function(err, res) {
  //       res.should.have.status(200);
  //       res.body.status.should.eql('ok');
  //       res.body.msg.should.eql('not found');
  //       done();
  //     });
  // });
});
