var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;

var ControlTimer = require('./controls');
var EventEmitter = require('events');

describe('Controls', function() {

  beforeEach(function () {
    this.clock = sinon.useFakeTimers();
  });
  afterEach(function () {
    this.clock.restore();
  });

  function tickHandler(event){
    console.log(this);
  }

  describe('start', function() {
    var startHandler = sinon.spy();
    it('should be a function', function () {
      var timer = new ControlTimer();
      expect(timer.start).to.be.a('function');
    });

    it('should start when start is emitted', function () {
      var timer = new ControlTimer();
      timer.on('start', startHandler);
      timer.start();
      expect(startHandler.called).to.be.true;
      expect(startHandler.callCount).to.equal(1);
    });

    it('should have an object containing when the timer has started', function () {
      var timer = new ControlTimer();
      timer.on('start', function (event){
        expect(event.timeStarted).to.be.a('number');
      });
      timer.start();
    });

    it('should start "ticking"', function () {
      var timer = new ControlTimer();
      timer.start();
      timer.on('tick', tickHandler);

      this.clock.tick(2000);
      expect(timer.i).to.equal(2);

      this.clock.tick(5000);
      expect(timer.i).to.equal(7);
    });
  });

  describe('stop', function() {
    var stopHandler = sinon.spy();
    it('should be a function', function () {
      var timer = new ControlTimer();
      expect(timer.stop).to.be.a('function');
    });

    it('should stop when emitted', function () {
      var timer = new ControlTimer();
      timer.on('stop', stopHandler);
      timer.stop();
      expect(stopHandler.called).to.be.true;
      expect(stopHandler.callCount).to.equal(1);
    });

    it('should have an object containing when the timer has stopped', function () {
      var timer = new ControlTimer();
      timer.start();
      timer.on('stop', function (event){
        expect(event.timeEnded).to.be.a('number');
      });
      this.clock.tick(2000);
      timer.stop();
    });

    it('should stop the timer when stop is emitted', function () {
      var timer = new ControlTimer();
      timer.start();
      timer.on('tick', tickHandler);

      this.clock.tick(2000);
      expect(timer.i).to.equal(2);
      timer.stop();
      this.clock.tick(3000);
      expect(timer.i).to.equal(2);
    });

    it('should start the timer where it left off after stop is emitted', function () {
      var timer = new ControlTimer();
      timer.start();
      timer.on('tick', tickHandler);

      this.clock.tick(2000);
      expect(timer.i).to.equal(2);
      timer.stop();
      this.clock.tick(5000);
      expect(timer.i).to.equal(2);
      timer.start();
      this.clock.tick(2000);
      expect(timer.i).to.equal(4);
    });
  });
});