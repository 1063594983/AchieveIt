import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

let should = chai.should();
chai.use(chaiHttp);


describe('get workTime test', function() {
  it('get workTime success', function (done) {
    let testMemberID = 1;
    chai.request(app)
      .get('/workTime/getMemberWorkTimeList/' + testMemberID)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.status.should.eql('ok');
        res.body.msg.should.eql('get success');
        should.exist(res.body.work_time_list)
        done();
      });
  });
  
  it('get workTime fail', function (done) {
    let testMemberID = 9999;
    chai.request(app)
      .get('/workTime/getMemberWorkTimeList/' + testMemberID)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.status.should.eql('ok');
        res.body.msg.should.eql('get success');
        res.body.work_time_list.should.eql([]);
        done();
      });
  });
});

describe('insert workTime test', function() {
  it('insert workTime success', function (done) {
    let testMemberID = 1;
    chai.request(app)
      .post('/workTime/' + testMemberID)
      .send({
        "function_id": 1,
        "activity_content": "test",
        "project_id": 1,
        "start_time": "2020-02-23T16:0",
        "end_time": "2020-02-24T16:0"
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
