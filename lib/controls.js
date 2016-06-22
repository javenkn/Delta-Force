var EventEmitter = require('events');
var util = require('util');
var BasicTimer = require('./BasicTimer');
module.exports = ControlTimer;

function ControlTimer () {

  this.start = function (event) {
    this.emit('start');
  };

  this.stop = function (event){
    this.emit('stop');
  };

}

util.inherits(ControlTimer, BasicTimer);