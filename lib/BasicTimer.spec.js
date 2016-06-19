var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;

var BasicTimer = require('./BasicTimer');


// var theFunction = function () {
//   console.log('hello');
// };

// var theModule = {
//   theFunction: 'theFunction'
// };

// describe('the spy', function(){
//   var theSpy;

//   beforeEach(function () {
//     theSpy = sinon.spy(theModule, 'theFunction');
//   });

//   it('should get invoked when invoked', function () {
//     theModule.theFunction();
//     expect(theSpy.called).to.be.true;
//   });

describe('BasicTimer', function(){
  it('should be a function', function () {
    expect(BasicTimer).to.be.a('function');
  });

});