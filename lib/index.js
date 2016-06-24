var LagTimer = require('./lag-event');
var timer = new LagTimer(10, 5);

timer.start();
timer.on('lag', function (event) {
  console.log('deviation: ' + event.offset);
});