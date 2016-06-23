var EventEmitter = require('events');
var util = require('util');
module.exports = ControlTimer;

function ControlTimer () {

  EventEmitter.call(this);

  var self = this;
  this.i = 0;

  this.start = function (event) {
    this.emit('start');
    this.interval = setInterval(function () {
      self.emit('tick', { interval : self.i++ });
    }, 1000);
  };

  this.stop = function (event){
    this.emit('stop');
    clearInterval(this.interval);
  };
}

util.inherits(ControlTimer, EventEmitter);