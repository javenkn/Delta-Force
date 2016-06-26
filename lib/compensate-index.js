var CompensateLagTimer = require('./compensate-lag');

var timer = new CompensateLagTimer (10, 5);

timer.start();
timer.on('lag', function (event) {
  console.log('deviation: ' + event.offset);
});