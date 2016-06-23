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

  describe('start', function() {
    var startHandler = sinon.spy();
    var stopHandler = sinon.spy();
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

    it('should start "ticking"', function () {
      var timer = new ControlTimer();
      // var tickHandler = sinon.spy();
      timer.start();
      timer.on('tick', tickHandler);
      function tickHandler(event){
        console.log(this);
      }

      this.clock.tick(2000);
      expect(timer.i).to.equal(2);

      this.clock.tick(5000);
      expect(timer.i).to.equal(7);
    });
  });

  describe('stop', function() {
    it('should be a function', function () {
      var timer = new ControlTimer();
      expect(timer.stop).to.be.a('function');
    });
  });
});