import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

let should = chai.should();
chai.use(chaiHttp);


describe('get config test', function() {
  it('get config success', function (done) {
    let testProjectID = 123;
    chai.request(app)
      .get('/config/' + testProjectID)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.status.should.eql('ok');
        should.exist(res.body.config)
        done();
      });
  });
  
  it('get config fail', function (done) {
    let testProjectID = 9999;
    chai.request(app)
      .get('/config/' + testProjectID)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.status.should.eql('error');
        res.body.msg.should.eql('not found');
        should.not.exist(res.body.config)
        done();
      });
  });
});

describe('insert config test', function() {
  it('insert config success', function (done) {
    chai.request(app)
      .post('/config')
      .send({
        "git_address": "test",
        "server_menu": "test",
        "vm_space": 123,
        "project_id": 1234
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

describe('update config test', function() {
  it('update config success', function (done) {
    let testProjectID = 1234;
    chai.request(app)
      .put('/config/' + testProjectID)
      .send({
        "git_address": "test2",
        "server_menu": "test2",
        "vm_space": 123123
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

describe('delete config test', function() {
  it('delete config success', function (done) {
    let testProjectID = 5;
    chai.request(app)
      .delete('/config/' + testProjectID)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.status.should.eql('ok');
        res.body.msg.should.eql('delete success');
        done();
      });
  });

  
  // it('delete config fail', function (done) {
  //   let testProjectID = 9999;
  //   chai.request(app)
  //     .delete('/config/' + testProjectID)
  //     .set('Content-Type', 'application/json')
  //     .end(function(err, res) {
  //       res.should.have.status(200);
  //       res.body.status.should.eql('ok');
  //       res.body.msg.should.eql('not found');
  //       done();
  //     });
  // });
});

