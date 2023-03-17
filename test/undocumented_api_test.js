const request = require('supertest')('https://qa-challenge-api.scratchpay.com/api/v1');
var expect = require('chai').expect;
const app = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { DateTime } = require('luxon');


chai.use(chaiHttp);
chai.should();

describe("Undocumented API tests", function(){

    it("should return the settlement date", (done) => {
       const inpdate = DateTime.local(2023, 11, 19, 0, 0, 0);
        chai.request(app)
             .get('/api/v1/settlementDate')
             .query({initialDate: inpdate, delay: 5})
             .end((err, res) => {
               expect(res.statusCode).to.equal(200);
               console.log(res.body);
               done();
             });
    });

   it('should return if give date is business day', (done) => {
         chai.request(app)
           .get('/api/v1/isBusinessDay')
           .query({date: '2023-18-3', country : 'US'})
           .end((err, res) => {
             expect(res.statusCode).to.equal(200);
             expect(res.body.results).be.true;
             console.log(res.body);
             done();
     });
   });

      it('should return if give date is business day', (done) => {
            chai.request(app)
              .get('/api/v1/isBusinessDay')
              .query({date: '', country : 'US'})
              .end((err, res) => {
             //   expect(res.statusCode).to.equal(200);
               expect(res.body.errorMessage).to.be.equal('A valid date is required');
                console.log(res.body);
                done();
        });
      });
});