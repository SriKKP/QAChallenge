const request = require('supertest')('https://qa-challenge-api.scratchpay.com/api/');
const expect = require('chai').expect;

const email = 'gianna@hightable.test';
const password = 'thedantonio1';

describe("Part 2 - API tests", function() {
    var token;
    before((done) => {
        request.get(`auth?email=${email}&password=${password}`).end((err, res) => {
            token = res.body.data.session.token;
            done();
        });
    });

    describe('GET /emails', function() {
        it("should return error when user tries to get email id of users of practice id 2", (done) => {
            request.get('clinics/2/emails').auth(token, {
                type: 'bearer'
            }).end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body.data.error).to.equal('Error: User does not have permissions');
                expect(res.body.data.message).to.equal('An error happened');
                done();
            });
        });
        it("should return error when user tries to get email id of users of practice id 2 without logging in", (done) => {
            request.get('clinics/2/emails').end((err, res) => {
                expect(res.statusCode).to.equal(401);
                expect(res.body.data.message).to.be.equal('You need to be authorized for this action.');
                done();
            });
        });

        it("should return email id of users of practice id 1 when logged in users calls the get api", (done) => {
            request.get('clinics/1/emails').auth(token, {
                type: 'bearer'
            }).end((err, res) => {
                expect(res.statusCode).to.equal(200);
                res.body.data.users.forEach(user => {
                    expect(user.id).to.exist;
                    expect(user.email).to.exist;
                    expect(user.firstName).to.exist;
                    expect(user.lastName).to.exist;
                });
                done();
            });
        });
    });
    describe('GET ?term', function() {

        it("should return results for text search with \"veterinary\", when user is logged in ", (done) => {
            request.get('clinics?term=veterinary').auth(token, {
                type: 'bearer'
            }).end((err, res) => {
                expect(res.statusCode).to.equal(200);
                res.body.data.forEach(data => {
                    expect(data.displayName.toLowerCase()).to.contain('veterinary');
                });
                done();
            });
        });
        it("should not return results for text search with \"veterinaryclinic\", when user is logged in ", (done) => {
            request.get('clinics?term=veterinaryclinic').auth(token, {
                type: 'bearer'
            }).end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.data).to.be.empty;
                done();
            });
        });

        it("should not return results for text search with \"general\", when user is logged in ", (done) => {
            request.get('clinics?term=general').auth(token, {
                type: 'bearer'
            }).end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.data).to.be.empty;
                done();
            });
        });
        it("should not return results for blank space in text search, when user is logged in ", (done) => {
            request.get('clinics?term=  ').auth(token, {
                type: 'bearer'
            }).end((err, res) => {
                expect(res.statusCode).to.equal(422);
                expect(res.body.ok).to.be.false;
                expect(res.body.error).to.be.equal('term is a required parameter for this action');
                done();
            });
        });
        it("should show appropriate message for text search with \"veterinary\", when user is NOT logged in ", (done) => {
            request.get('clinics?term=veterinary').end((err, res) => {
                expect(res.statusCode).to.equal(401);
                expect(res.body.data.message).to.be.equal('You need to be authorized for this action.');
                done();
            });
        });

    });

});