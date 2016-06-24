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

    it('should be equal to the parameter', function () {
      timer = new TimeLimit(3);
      expect(timer.maxTime).to.be.equal(3);
    });
  });

  describe('tick events', function () {
    it('should have 20 tick events', function () {
      var tickHandler = sinon.spy();
      timer = new TimeLimit(20);
      timer.start();
      timer.on('tick',tickHandler);
      this.clock.tick(30000);
      expect(tickHandler.callCount).to.equal(20);
    });

    it('should create an event object containing the total time', function () {
      var tickHandler = sinon.spy();
      var completeHandler = sinon.spy();
      timer = new TimeLimit(25);
      timer.on('tick', tickHandler);
      timer.on('complete', function (event) {
        expect(event.totalTime).to.be.equal(30000);
      });
      timer.start();
      this.clock.tick(20000);
      expect(tickHandler.callCount).to.equal(20);
      timer.stop();
      this.clock.tick(5000);
      expect(tickHandler.callCount).to.equal(20);
      timer.start();
      this.clock.tick(5000);
      expect(tickHandler.callCount).to.equal(25);
      this.clock.tick(7000);
      expect(tickHandler.callCount).to.equal(25);
    });
  });
});