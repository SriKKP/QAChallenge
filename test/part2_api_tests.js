const request = require('supertest')('https://qa-challenge-api.scratchpay.com/api/');
//import supertest from 'supertest';
//const request = supertest('https://qa-challenge-api.scratchpay.com/api/');
const expect = require('chai').expect;
//const assert = require( "assert" );
//let express = require('express');
//let app = express();

describe("Part 2 - API tests", function(){
var token;
    before((done) => {
        request.get('auth?email=gianna@hightable.test&password=thedantonio1').end((err,res) => {
        token = res.body.data.session.token;
        done();
        });
    });

    it("should return error when user tries to get email id of users of practice id 2", (done) => {
      request.get('clinics/2/emails').set('Authorization','bearer '+token).end((err,res) => {
      expect(res.statusCode).to.equal(400);
      expect(res.body.data.error).to.equal('Error: User does not have permissions');
      expect(res.body.data.message).to.equal('An error happened');
        console.log(res.body);
        done();
        });
    });

    it("should return results for text search with \"veterinary\", when user is logged in ", (done) => {
        request.get('clinics?term=veterinary').set('Authorization','bearer '+token).end((err,res) => {
        expect(res.statusCode).to.equal(200);
        res.body.data.forEach(data=>{
        expect(data.displayName).to.contain('Veterinary');
        });
        console.log(res.body);
        done();
        });
    });

     it("should not return results for text search with \"general\", when user is logged in ", (done) => {
            request.get('clinics?term=general').set('Authorization','bearer '+token).end((err,res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.data).to.be.empty;
            console.log(res.body);
            done();
            });
        });

    it("should show appropriate message for text search with \"veterinary\", when user is NOT logged in ", (done) => {
            request.get('clinics?term=veterinary').end((err,res) => {
            expect(res.statusCode).to.equal(401);
            expect(res.body.data.message).to.be.equal('You need to be authorized for this action.');
            console.log(res.body);
            done();
            });
        });



});