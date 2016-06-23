var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;

var TimeLimit = require('./time-limit');
var EventEmitter = require('events');

describe('Time-Limit', function () {
var timer;

  beforeEach(function () {
    this.clock = sinon.useFakeTimers();
  });
  afterEach(function () {
    this.clock.restore();
  });

  describe('Timer argument', function () {
    it('should be set as a default 10', function () {
      timer = new TimeLimit();
      expect(timer.maxTime).to.be.equal(10);
    });

    it('should be equal to 10, if the argument is less than 10', function () {
      timer = new TimeLimit(3);
      expect(timer.maxTime).to.be.equal(10);
    });
  });

  describe('tick events', function () {
    it('should have 20 tick events', function () {
      var tickHandler = sinon.spy();
      timer = new TimeLimit(20);
      timer.start();
      timer.on('tick', tickHandler);
      expect(tickHandler.callCount).to.equal(20);
    });
  });
});