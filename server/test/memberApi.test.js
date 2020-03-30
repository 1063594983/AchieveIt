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
                console.log(res.body);
                expect(res.body.msg).to.be.eql('not found')
                done();
            })
    })
});