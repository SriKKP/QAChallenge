const assert = require('chai').assert;
const {
    Before,
    Given,
    When,
    Then
} = require('@cucumber/cucumber')
const request = require('supertest')('https://qa-challenge-api.scratchpay.com/api/');
const support = require('../support.js');
const expect = require('chai').expect;


const email = 'gianna@hightable.test';
const password = 'thedantonio1';

Given('User is logged in', function(done) {
    request.get(`auth?email=${email}&password=${password}`).end((err, res) => {
        support.token = res.body.data.session.token;
        done();
    });
});


When('I send a GET request to get email addresses of practice id 2', function(done) {
    request.get('clinics/2/emails').auth(support.token, {
        type: 'bearer'
    }).end((err, res) => {
        support.result = res.body;
        done();
    });
});

Then('Response should show appropriate error message', function(done) {
    assert.isFalse(support.result.ok);
    assert.equal(support.result.data.message, 'An error happened');
    assert.equal(support.result.data.error, 'Error: User does not have permissions');
    done();
});

When('I text search with - veterinary', function(done) {
    request.get('clinics?term=veterinary').auth(support.token, {
        type: 'bearer'
    }).end((err, res) => {
        support.result = res.body;
        done();
    });
});

Then('Response should have list of data with display name containing - veterinary', function(done) {
    support.result.data.forEach(data => {
        expect(data.displayName.toLowerCase()).to.contain('veterinary');
    });
    done();
});
When('I text search with - veterinary without logging in', function(done) {
    request.get('clinics?term=veterinary').end((err, res) => {
        support.result = res.body;
        done();
    });
});

Then('Response should show message that user is not authorized', function(done) {
    assert.equal(support.result.data.message, 'You need to be authorized for this action.');
    done();
});