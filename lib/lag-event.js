var EventEmitter = require('events');
var util = require('util');
module.exports = LagTimer;

function LagTimer () {

}

util.inherits(LagTimer, EventEmitter);