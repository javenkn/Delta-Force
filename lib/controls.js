var EventEmitter = require('events');
var util = require('util');
var BasicTimer = require('./BasicTimer');

var timer = new BasicTimer();

timer.prototype.start = function () {
  var self = this;
  self.emit('start');
};

timer.prototype.stop = function (){
  var self = this;
  self.emit('stop');
};