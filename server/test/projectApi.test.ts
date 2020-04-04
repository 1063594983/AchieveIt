import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

let should = chai.should();
chai.use(chaiHttp);


describe('project test', function() {
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
