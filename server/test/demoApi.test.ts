import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

let should = chai.should();
chai.use(chaiHttp);


describe('get demo test', function() {
  it('get demo hello success', function (done) {
    chai.request(app)
      .get('/demo/hello')
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.status.should.eql('ok');
        res.body.project.should.eql('AchieveIt');
        res.body.msg.should.eql('Test');
        done();
      });
  });
  
  it('get demo success', function (done) {
    let testEmployeeID = 123;
    chai.request(app)
      .get('/demo/getDemo/' + testEmployeeID)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.employ_id.should.eql('123');
        done();
      });
  });
});

describe('send email demo test', function() {
  it('send email success', function (done) {
    chai.request(app)
      .post('/demo/sendEmail')
      .send({})
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.status.should.eql('ok');
        done();
      });
  });
});

describe('post demo test', function() {
  it('post demo success', function (done) {
    let testEmployeeID = 123;
    chai.request(app)
      .post('/demo/postDemo/' + testEmployeeID)
      .send({
        "username": "1",
        "password": "1"  
      })
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        should.exist(res.body.employ_id)
        should.exist(res.body.username)
        should.exist(res.body.password)
        done();
      });
  });
});

describe('update demo test', function() {
  it('update demo success', function (done) {
    chai.request(app)
      .put('/demo/putDemo')
      .send({
        "username": "1",
        "password": "1"  
      })
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        should.exist(res.body.username)
        should.exist(res.body.password)
        done();
      });
  });
});

describe('delete demo test', function() {
  it('delete demo success', function (done) {
    chai.request(app)
      .put('/demo/deleteDemo')
      .send({
        "username": "1",
        "password": "1"  
      })
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        should.exist(res.body.username)
        should.exist(res.body.password)
        done();
      });
  });
});


