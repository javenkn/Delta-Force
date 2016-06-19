var EventEmitter = require('events');
var util = require('util');

module.exports = BasicTimer;

function BasicTimer () {

  var self = this;

  setInterval(function () {
    self.emit('tick');
  }, 1000);

}
util.inherits(BasicTimer, EventEmitter);