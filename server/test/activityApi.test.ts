import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

let should = chai.should();
chai.use(chaiHttp);


describe('get activity test', function() {
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

describe('insert activity test', function() {
  it('insert activity success', function (done) {
    chai.request(app)
      .post('/activity')
      .send({
        "activity_name": "0-0",
        "activity_content": "activity_content test",
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

describe('update activity test', function() {
  it('update activity success', function (done) {
    let testactivityID = 2;
    chai.request(app)
      .put('/activity/' + testactivityID)
      .send({
        "activity_name": "0-0",
        "activity_content": "activity_content test2",
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

describe('delete activity test', function() {
  it('delete activity success', function (done) {
    let testactivityID = 5;
    chai.request(app)
      .delete('/activity/' + testactivityID)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.status.should.eql('ok');
        res.body.msg.should.eql('delete success');
        done();
      });
  });

  
  // it('delete activity fail', function (done) {
  //   let testactivityID = 9999;
  //   chai.request(app)
  //     .delete('/activity/' + testactivityID)
  //     .set('Content-Type', 'application/json')
  //     .end(function(err, res) {
  //       res.should.have.status(200);
  //       res.body.status.should.eql('ok');
  //       res.body.msg.should.eql('not found');
  //       done();
  //     });
  // });
});
