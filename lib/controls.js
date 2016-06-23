var EventEmitter = require('events');
var util = require('util');
module.exports = ControlTimer;

function ControlTimer () {
  this.i = 0;
}

util.inherits(ControlTimer, EventEmitter);

ControlTimer.prototype.start = function (event) {
  var self = this;
  this.emit('start');
  this.interval = setInterval(function () {
    self.emit('tick', { interval : self.i++ });
  }, 1000);
};

ControlTimer.prototype.stop = function (event) {
  this.emit('stop');
  clearInterval(this.interval);
};
