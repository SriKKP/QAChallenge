//import supertest from 'supertest';
//const request = require('supertest')('/api/v1');
//import {expect} from 'chai';
//import {isBusinessDay} from '../lib/dates.js'
var expect = require('chai').expect;
const { DateTime } = require('luxon');
const dates = require('../lib/dates')



describe("Part 1 tests", function(){

    it("should check if it is Business Day when given a weekend date", () => {
          const date = DateTime.local(2023, 11, 19, 0, 0, 0);
          expect(dates.isBusinessDay(date)).be.false;
    });
    it("should check if it is Business Day when given a holiday date", () => {
          const date = DateTime.local(2023, 11, 23, 15, 0, 0);
          expect(dates.isBusinessDay(date, 'US')).be.false;
    });
    it("should check if it is Business Day when given a weekday(not holiday) date", () => {
          const date = DateTime.local(2023, 11, 20, 0, 0, 0);
          expect(dates.isBusinessDay(date)).be.true;
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

 });
