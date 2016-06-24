var EventEmitter = require('events');
var util = require('util');
module.exports = LagTimer;

function LagTimer (maxTime, maxDeviation) {
  if(isNaN(maxTime)){
    this.maxTime = 10;
  }else{
    this.maxTime = maxTime;
  }
  if(isNaN(maxDeviation)){
    this.maxDeviation = 50;
  }else{
    this.maxDeviation = maxDeviation;
  }
  this.i = 0;
}

util.inherits(LagTimer, EventEmitter);

LagTimer.prototype.stopTime = undefined;

LagTimer.prototype.start = function (event) {
  var self = this;
  this.timeStart = Date.now();
  console.log('start: ' + this.timeStart);
  this.emit('start', { timeStarted : this.timeStart});
  this.interval = setInterval(function () {
    self.emit('tick', { interval : self.i++ });
    var timeNow = Date.now();
    var lagTime = timeNow - self.timeStart;
    self.timeStart = timeNow;
    console.log('deviation: ' + lagTime);
    if(self.i >= self.maxTime){
      if(self.i === self.maxTime){
        self.stop();
        console.log('complete');
        console.log('end: ' + self.stopTime);
        self.emit('complete', { totalTime : self.stopTime});
      }
    }
    console.log(timeNow);
    console.log(self.i);
  }, 1000);
};

LagTimer.prototype.stop = function (event) {
  this.stopTime = Date.now();
  this.emit('stop', { timeEnded : this.timeEnd});
  clearInterval(this.interval);
};