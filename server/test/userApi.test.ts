import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

let should = chai.should();
chai.use(chaiHttp);


describe('login test', function() {
  it('login success', function (done) {
    chai.request(app)
      .post('/user/login')
      .send('{"username":"3","password":"3"}')
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.status.should.eql('ok');
        should.exist(res.body.token)
        done();
      });
  });
  
  it('login fail', function (done) {
    chai.request(app)
      .post('/user/login')
      .send('{"username":"1","password":"2"}')
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.status.should.eql('error');
        res.body.msg.should.eql('用户名或密码错误');
        should.not.exist(res.body.token)
        done();
      })
  });
});
