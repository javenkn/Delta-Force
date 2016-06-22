var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;

var ControlTimer = require('./controls');
var EventEmitter = require('events');

describe('Controls', function() {
  var timer = new ControlTimer();

  describe('start', function() {
    var startHandler = sinon.spy();
    var stopHandler = sinon.spy();
    it('should be a function', function () {
      expect(timer.start).to.be.a('function');
    });

    it('should start when start is emitted', function () {
      expect(timer.start.called).to.be.true;
    });
  });

  describe('stop', function() {
    it('should be a function', function () {
      expect(timer.stop).to.be.a('function');
    });
  });
});