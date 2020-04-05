import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

let should = chai.should();
chai.use(chaiHttp);


describe('get ProjectFunctionList test', function() {
  it('get ProjectFunctionList success', function (done) {
    let testProjectID = 123;
    chai.request(app)
      .get('/function/getProjectFunctionList/' + testProjectID)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.status.should.eql('ok');
        res.body.msg.should.eql('success');
        should.exist(res.body.feature_list);
        done();
      });
  });
  
  it('get ProjectFunctionList fail', function (done) {
    let testProjectID = 9999;
    chai.request(app)
      .get('/function/getProjectFunctionList/' + testProjectID)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.status.should.eql('ok');
        res.body.msg.should.eql('success');
        res.body.feature_list.should.eql([]);
        done();
      });
  });
});

// describe('add function test', function() {
//   it('add function success', function (done) {
//     let testProjectID = 1234;
//     chai.request(app)
//       .post('/function/addFunctionToProject/' + testProjectID)
//       .send({
//         "function_name": "function123",
//         "layer": 3
//       })
//       .set('Content-Type', 'application/json')
//       .end(function(err, res) {
//         res.should.have.status(200);
//         res.body.status.should.eql('ok');
//         res.body.msg.should.eql('insert success');
//         done();
//       });
//   });
// });

describe('import Function Excel test', function() {
  it('import Function Excel fail', function (done) {
    let testProjectID = 1234;
    chai.request(app)
      .post('/function/importFunctionExcelToProject/' + testProjectID)
      .send({
        "function_excel": {}
      })
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.status.should.eql('ok');
        done();
      });
  });
});

describe('import Function Excel test', function() {
  it('import Function Excel fail', function (done) {
    chai.request(app)
      .post('/function/setFunctionRelation')
      .send({
        "first_function_id": "1",
        "second_function_id": "2"
      })
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
  });
});
