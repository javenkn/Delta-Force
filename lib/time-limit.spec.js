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
    var tickHandler = sinon.spy();
    it('should have 20 tick events', function () {
      timer = new TimeLimit(20);
      timer.start();
      timer.on('tick',tickHandler);
      this.clock.tick(10000);
      timer.stop();
      timer.start();
      this.clock.tick(10000);
      timer.stop();
      this.clock.tick(5000);
      expect(tickHandler.callCount).to.equal(20);
    });
  });
});