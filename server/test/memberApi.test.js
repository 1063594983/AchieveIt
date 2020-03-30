var expect = require('chai').expect;
var request = require('superagent');
var testBaseURL = require('./util').testBaseURL;

describe('getMember test', function () {
    it('getMember success', function (done) {
        request
            .get(testBaseURL + 'member/1')
            .send()
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.body.msg).to.be.eql('success')
                done();
            });
    });

    it('getMember fail', function (done) {
        request
            .get(testBaseURL + 'member/1000')
            .send()
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.body.msg).to.be.eql('not found')
                done();
            })
    })
});

describe('updateMember test', function () {
    it('updateMember success', function (done) {
        request
            .put(testBaseURL + 'member/15')
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
                expect(res.body.msg).to.be.eql('update success')
                done();
            });
    });

    it('updateMember fail', function (done) {
        request
            .put(testBaseURL + 'member/1000')
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
                expect(res.body.msg).to.be.eql('not found')
                done();
            })
    })
});

describe('insertMember test', function () {
    it('insertMember success', function (done) {
        request
            .post(testBaseURL + 'member')
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
                expect(res.body.msg).to.be.eql('insert success')
                done();
            });
    });
});


describe('deleteMember test', function () {
    it('deleteMember success', function (done) {
        request
            .delete(testBaseURL + 'member/36')
            .send()
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.body.msg).to.be.eql('delete success')
                done();
            });
    });

    it('deleteMember failed', function (done) {
        request
            .delete(testBaseURL + 'member/1000')
            .send()
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.body.msg).to.be.eql('not found')
                done();
            });
    });
});


describe('getMemberRoleInProject test', function () {
    it('getMemberRoleInProject success', function (done) {
        request
            .get(testBaseURL + 'member/getMemberRoleInProject/20200329M?member_id=1')
            .send()
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.body.msg).to.be.eql('get success')
                done();
            });
    });

    it('getMemberRoleInProject fail', function (done) {
        request
            .get(testBaseURL + 'member/getMemberRoleInProject/2020032M?member_id=1')
            .send()
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.body.msg).to.be.eql('not found')
                done();
            })
    })
});


