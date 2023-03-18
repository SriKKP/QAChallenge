var expect = require('chai').expect;
const app = require('../index');
const {
    DateTime
} = require('luxon');
const request = require('supertest');
const assert = require('chai').assert;


describe("v1 API tests", function() {

    it("should return the Business date including holidays and weekends to the delay", (done) => {
        request(app)
            .get('/api/v1/settlementDate')
            .query({
                initialDate: '2023-11-23T09:08:34.123',
                delay: 5,
                country: 'US'
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.results.businessDate).to.contain('2023-12-01');
                expect(res.body.results.holidayDays).to.be.equal(2);
                expect(res.body.results.totalDays).to.be.equal(9);
                expect(res.body.results.weekendDays).to.be.equal(2);
                done();
            });
    });
    it("should return the Business date when there are no holidays and no weekends", (done) => {
        request(app)
            .get('/api/v1/settlementDate')
            .query({
                initialDate: '2023-03-20T09:08:34.123',
                delay: 3
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.results.businessDate).to.contain('2023-03-22');
                expect(res.body.results.holidayDays).to.be.equal(0);
                expect(res.body.results.totalDays).to.be.equal(3);
                expect(res.body.results.weekendDays).to.be.equal(0);
                done();
            });
    });

    it("should return the same day(initialdate) as Business date when there is no delay", (done) => {
        request(app)
            .get('/api/v1/settlementDate')
            .query({
                initialDate: '2023-03-20T09:08:34.123',
                delay: 0,
                country: 'US'
            })
            .end((err, res) => {
                console.log(res.body.results.businessDate);
                expect(res.statusCode).to.equal(200);
                expect(res.body.results.holidayDays).to.be.equal(0);
                expect(res.body.results.totalDays).to.be.equal(0);
                expect(res.body.results.weekendDays).to.be.equal(0);
                expect(res.body.results.businessDate, 'Business date is not as expected when there is no delay. The business day cannot be before initial day.').to.contain('2023-03-20');
                done();
            });
    });

    it('should return true when input date is business day and country is provided', (done) => {
        request(app)
            .get('/api/v1/isBusinessDay')
            .query({
                date: '2023-18-3',
                country: 'US'
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.results).be.true;
                done();
            });
    });

    it('should return true when input date is business day and country is not provided', (done) => {
        request(app)
            .get('/api/v1/isBusinessDay')
            .query({
                date: '2023-27-3'
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.results).be.true;
                done();
            });
    });

    it('should return error if date empty', (done) => {
        request(app)
            .get('/api/v1/isBusinessDay')
            .query({
                date: '',
                country: 'US'
            })
            .end((err, res) => {
                expect(res.body.errorMessage).to.be.equal('A valid date is required');
                expect(res.body.ok).to.be.false;
                done();
            });
    });
    it('should return error when date is invalid', (done) => {
        request(app)
            .get('/api/v1/isBusinessDay')
            .query({
                date: 'abcdef',
                country: 'US'
            })
            .end((err, res) => {
                expect(res.body.ok).to.be.false;
                done();
            });
    });

});