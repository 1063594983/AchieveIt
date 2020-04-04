import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

let should = chai.should();
chai.use(chaiHttp);


describe('getMember test', function () {
    it('getMember success', function (done) {
        chai.request(app)
            .get('/member/1')
            .send()
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                res.body.msg.should.eql('success');
                done();
            });
    });

    it('getMember fail', function (done) {
        chai.request(app)
            .get('/member/1000')
            .send()
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                res.body.msg.should.eql('not found');
                done();
            })
    })
});

describe('updateMember test', function () {
    it('updateMember success', function (done) {
        chai.request(app)
            .put('/member/15')
            .send({
                "member_name": "kkkk",
                "email": "1063594983@qq.com",
                "department": "unknown",
                "leader_email": "unknown",
                "phone": "18321572818",
                "job": 5
            })
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                res.body.msg.should.eql('update success');
                done();
            });
    });

    it('updateMember fail', function (done) {
        chai.request(app)
            .put('/member/1000')
            .send({
                "member_name": "kkk",
                "email": "1063594983@qq.com",
                "department": "unknown",
                "leader_email": "unknown",
                "phone": "18321572818",
                "job": 5
            })
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                res.body.msg.should.eql('not found');
                done();
            })
    })
});

describe('insertMember test', function () {
    it('insertMember success', function (done) {
        chai.request(app)
            .post('/member')
            .send({
                "member_name": "jotaro",
                "email": "1063594983@qq.com",
                "department": "unknown",
                "leader_email": "unknown",
                "phone": "18321572818",
                "job": 5
            })
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                res.body.msg.should.eql('insert success');
                done();
            });
    });
});


describe('deleteMember test', function () {
    it('deleteMember success', function (done) {
        chai.request(app)
            .delete('/member/36')
            .send()
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                res.body.msg.should.eql('delete success');
                done();
            });
    });

    it('deleteMember failed', function (done) {
        chai.request(app)
            .delete('/member/1000')
            .send()
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                res.body.msg.should.eql('not found');
                done();
            });
    });
});


describe('getMemberRoleInProject test', function () {
    it('getMemberRoleInProject success', function (done) {
        chai.request(app)
            .get('/member/getMemberRoleInProject/20200329M?member_id=1')
            .send()
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                res.body.msg.should.eql('get success');
                done();
            });
    });

    it('getMemberRoleInProject fail', function (done) {
        chai.request(app)
            .get('/member/getMemberRoleInProject/2020032M?member_id=1')
            .send()
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                res.body.msg.should.eql('not found');
                done();
            })
    })
});


