var expect = require('chai').expect;
const { DateTime } = require('luxon');
const dates = require('../lib/dates')
const { assert } = require('chai');


describe("Part 1 tests", function(){

    it("should check if it is Business Day when given a weekend date", () => {
          const date = '2023-11-19';
          expect(dates.isBusinessDay('2023-11-19')).be.false;
    });
    it("should check if it is Business Day when given a holiday date", () => {
          const date = '2023-11-23';
          expect(dates.isBusinessDay(date, 'US')).be.false;
    });
    it("should check if it is Business Day when given a weekday(not holiday) date", () => {
          const date = '2023-11-20';
          expect(dates.isBusinessDay(date)).be.true;
    });
    it("should check if it is Business Day when given an empty date", () => {
              const date = '';
              assert.isFalse(dates.isBusinessDay(date));
    });
    it("should check if it is Business Day when given an invalid input for date", () => {
              const date = 'abcdef';
              assert.isFalse(dates.isBusinessDay(date));
    });
    it("should return the total delay(including weekends and holidays) when delay in number of business days provided is 0", () => {
          const myDateTime = DateTime.local(2023, 3, 16, 12, 0, 0);
          const result = dates.getTotalDelay(myDateTime, 0);
          expect(result.totalDays).to.be.equal(0);
    });
    it("should return the total delay(including weekends and holidays) when delay in number of business days provided is greater than 0", () => {
          const myDateTime = DateTime.local(2023, 3, 16, 12, 0, 0);
          const result = dates.getTotalDelay(myDateTime, 5);
          expect(result.totalDays).to.be.equal(7);
    });

/**
* toDateTime function in lib/dates.js is not exported nor used in any other exported function.
* Added export function explicitly for it in lib/dates.js, for code coverage.
*/
    it("should return DateTime when given a string", () => {
          const result = dates.toDateTime(['2023-11-23T09:08:34.123']);
          expect(result[0].isLuxonDateTime).to.be.true;
    });
 });
