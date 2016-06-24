var EventEmitter = require('events');
var util = require('util');
module.exports = CompensateLagTimer;

function CompensateLagTimer (maxTime, maxDeviation) {
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

util.inherits(CompensateLagTimer, EventEmitter);

CompensateLagTimer.prototype.stopTime = undefined;

CompensateLagTimer.prototype.start = function (event) {
  var self = this;
  this.timeStart = Date.now();
  console.log('start: ' + this.timeStart);
  this.emit('start', { timeStarted : this.timeStart});
  this.interval = setInterval(function () {

    self.emit('tick', { interval : self.i++ });
    var timeNow = Date.now();
    self.lagTime = timeNow - self.timeStart;
    self.timeStart = timeNow;
    console.log('deviation: ' + self.lagTime);

    if(self.i >= self.maxTime){
      if(self.i === self.maxTime){
        self.stop();
        console.log('complete');
        self.emit('complete', { totalTime : self.stopTime});
      }
    }

    if(self.lagTime > (1000 + self.maxDeviation) || self.lagTime < (1000 - self.maxDeviation)){
      self.emit('lag', { offset: self.lagTime});
      console.log('Lag occurred.');
    }else{
      console.log('No lag!');
    }
    console.log(timeNow);
    console.log(self.i);
  }, 1000);
};

CompensateLagTimer.prototype.stop = function (event) {
  this.stopTime = Date.now();
  this.emit('stop', { timeEnded : this.timeEnd});
  clearInterval(this.interval);
};