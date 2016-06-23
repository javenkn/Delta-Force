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
}



util.inherits(TimeLimit, ControlTimer);
