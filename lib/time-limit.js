var EventEmitter = require('events');
var util = require('util');
var ControlTimer = require('./controls');
module.exports = TimeLimit;

function TimeLimit (maxTime) {
  if(isNaN(maxTime) || maxTime < 10){
    this.maxTime = 10;
  }else{
    this.maxTime = maxTime;
  }
  this.i = 0;
}

util.inherits(TimeLimit, EventEmitter);

TimeLimit.prototype.stopTime = undefined;

TimeLimit.prototype.start = function (event) {
  var self = this;
  this.timeStart = Date.now();
  this.emit('start', { timeStarted : this.timeStart});
  this.interval = setInterval(function () {
    self.emit('tick', { interval : self.i++ });
    if(self.i >= self.maxTime){
      if(self.i === self.maxTime){
        self.stop();
        console.log('complete');
        console.log(self.stopTime);
        self.emit('complete', { totalTime : self.stopTime});
      }
    }
    console.log(self.i);
    console.log(self.maxTime);
  }, 1000);
};

TimeLimit.prototype.stop = function (event) {
  this.stopTime = Date.now();
  this.emit('stop', { timeEnded : this.timeEnd});
  clearInterval(this.interval);
};