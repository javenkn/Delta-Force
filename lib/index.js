var LagTimer = require('./lag-event');
var timer = new LagTimer(10, 50);

timer.start();