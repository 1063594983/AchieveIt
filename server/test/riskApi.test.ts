import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

let should = chai.should();
chai.use(chaiHttp);


describe('get risk test', function() {
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

describe('insert risk test', function() {
  it('insert risk success', function (done) {
    chai.request(app)
      .post('/risk')
      .send({
        "detail": "detailtest",
        "project_id": 123,
        "solve_status": 3
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

describe('update risk test', function() {
  it('update risk success', function (done) {
    let testRiskID = 4;
    chai.request(app)
      .put('/risk/' + testRiskID)
      .send({
        "detail": "detailtest2",
        "solve_status": 4
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

describe('delete risk test', function() {
  it('delete risk success', function (done) {
    let testRiskID = 5;
    chai.request(app)
      .delete('/risk/' + testRiskID)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.status.should.eql('ok');
        res.body.msg.should.eql('delete success');
        done();
      });
  });

  
  // it('delete risk fail', function (done) {
  //   let testRiskID = 9999;
  //   chai.request(app)
  //     .delete('/risk/' + testRiskID)
  //     .set('Content-Type', 'application/json')
  //     .end(function(err, res) {
  //       res.should.have.status(200);
  //       res.body.status.should.eql('ok');
  //       res.body.msg.should.eql('not found');
  //       done();
  //     });
  // });
});

describe('get ProjectRiskList test', function() {
  it('get ProjectRiskList success', function (done) {
    let testProjectID = 123;
    chai.request(app)
      .get('/risk/getProjectRiskList/' + testProjectID)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.msg.should.eql('success');
        should.exist(res.body.risk_list)
        done();
      });
  });

  
  it('get ProjectRiskList fail', function (done) {
    let testProjectID = 4;
    chai.request(app)
      .get('/risk/getProjectRiskList/' + testProjectID)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.msg.should.eql('success');
        res.body.risk_list.should.eql([]);
        done();
      });
  });
});
