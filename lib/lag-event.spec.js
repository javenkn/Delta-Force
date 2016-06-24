var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;

var LagTimer = require('./lag-event');
var EventEmitter = require('events');

describe('Time-Limit', function () {
var timer;

  beforeEach(function () {
    this.clock = sinon.useFakeTimers();
  });
  afterEach(function () {
    this.clock.restore();
  });

});