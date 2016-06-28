var CompensateLagTimer = require('./compensate-lag');

var timer = new CompensateLagTimer (10, 5);

timer.start();
timer.on('lag', function () {
  var compensateLag = 1000 - (this.lagTime%1000);
  clearInterval(this.interval);
  setTimeout(function () {
    console.log('Compensating lag');
    console.log('How much to compensate: ' + compensateLag);
    timer.start();
  }, compensateLag);
});