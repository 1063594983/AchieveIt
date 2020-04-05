import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
var randomString = require('./util').randomString

let should = chai.should();
chai.use(chaiHttp);


describe('project test', function() {
  it('get all projects', function (done) {
    chai.request(app)
      .get('/project/getAllProjects')
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.status.should.eql('ok');
        should.exist(res.body.project_list)
        done();
      });
  });

  it('get project success', function (done) {
    let testProjectID = 123;
    chai.request(app)
      .get('/project/' + testProjectID)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.status.should.eql('ok');
        should.exist(res.body.project)
        done();
      });
  });
  
  it('get project fail', function (done) {
    let testProjectID = 9999;
    chai.request(app)
      .get('/project/' + testProjectID)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.status.should.eql('error');
        res.body.msg.should.eql('not found');
        should.not.exist(res.body.project)
        done();
      });
  });
});


describe('insert project test', function() {
  it('insert project success', function (done) {
    chai.request(app)
      .post('/project')
      .send({
        "project_id": randomString(9),
        "project_name": "test",
        "client_info": "test",
        "start_time": "2020-02-23T16:0",
        "end_time": "2020-02-24T16:0",
        "manager": "test",
        "important_events": [],
        "technology": [],
        "business": [],
        "status": 0
      })
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.status.should.eql('ok');
        res.body.msg.should.eql('success');
        done();
      });
  });

  it('insert project fail (project_id is NULL)', function (done) {
    chai.request(app)
      .post('/project')
      .send({
        "project_name": "test",
        "client_info": "test",
        "start_time": "2020-02-23T16:0",
        "end_time": "2020-02-24T16:0",
        "manager": "test",
        "important_events": [],
        "technology": [],
        "business": [],
        "status": 0
      })
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.status.should.eql('error');
        res.body.msg.should.eql('项目id不能为空');
        done();
      });
  });
});

describe('update project test', function() {
  it('update project success', function (done) {
    let testProjectID = 1234;
    chai.request(app)
      .put('/project/' + testProjectID)
      .send({
        "project_name": "test222",
        "client_info": "test222",
        "start_time": "2020-02-23T16:0",
        "end_time": "2020-02-24T16:0",
        "manager": "test222",
        "important_events": [],
        "technology": [],
        "business": [],
        "status": 0
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

describe('delete project test', function() {
  it('delete project success', function (done) {
    let testprojectID = 12345;
    chai.request(app)
      .delete('/project/' + testprojectID)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.status.should.eql('ok');
        res.body.msg.should.eql('delete success');
        done();
      });
  });
});

describe('acceptProject test', function() {
  it('acceptProject success', function (done) {
    let testprojectID = 1234;
    chai.request(app)
      .get('/project/acceptProject/' + testprojectID)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.status.should.eql('ok');
        res.body.msg.should.eql('success');
        done();
      });
  });
});

describe('refuseProject test', function() {
  it('refuseProject success', function (done) {
    let testprojectID = 1234;
    chai.request(app)
      .get('/project/refuseProject/' + testprojectID)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.status.should.eql('ok');
        res.body.msg.should.eql('success');
        done();
      });
  });
});
