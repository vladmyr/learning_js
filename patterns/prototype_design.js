/**
 * Revealing Prototype design pattern
 */

var TeslaCar = function(make){
  this.numWheels = 4;
  this.manufacturer = "Tesla";
  this.make = make;
  this.isBroken = false;
  this.isEngineStarted = false;
  this.kBreak = 1;
  this.breakFactor = 3;
};

var Temp = function(){

};

TeslaCar.prototype = function(){
  const MESSAGE = {
    STARTED: "Engine is already started",
    STARTING: "Starting engine...",
    ACCELERATING: "Accelerating...",
    SLOWING: "Slowing down...",
    STOPPED: "Engine is not started",
    STOPPING: "Stopping engine...",
    BROKE_DOWN: "Oh no! You broke down the car... Visit car service...",
    BROKEN: "Car is broken..."
  };

  var startEngine = function(){
    if(this.isBroken){
      console.log(this.make, MESSAGE.BROKEN)
    } else if(Math.random() * 10 > this.kBreak){
      if (this.isEngineStarted) {
        this.kBreak *= this.breakFactor;
        console.log(this.make, MESSAGE.STARTED);
      } else {
        console.log(this.make, MESSAGE.STARTING);
        this.isEngineStarted = true;
      }
    } else {
      console.log(this.make, MESSAGE.BROKE_DOWN);
      this.isBroken = true;
    }
  };

  var stopEngine = function(){
    if(this.isBroken){
      console.log(this.make, MESSAGE.BROKEN)
    } else if (this.isEngineStarted) {
      console.log(this.make, MESSAGE.STOPPING);
      this.isEngineStarted = false
    } else {
      console.log(this.make, MESSAGE.STOPPED);
    }
  };

  var brake = function(){
    if(this.isBroken){
      console.log(this.make, MESSAGE.BROKEN)
    } else if(this.isEngineStarted){
      console.log(this.make, MESSAGE.SLOWING);
    }else{
      console.log(this.make, MESSAGE.STOPPED);
    }

  };

  var accelerate = function(){
    if(this.isBroken){
      console.log(this.make, MESSAGE.BROKEN)
    } else if(this.isEngineStarted){
      console.log(this.make, MESSAGE.ACCELERATING);
    }else{
      console.log(this.make, MESSAGE.STOPPED);
    }
  };

  return {
    startEngine: startEngine,
    stopEngine: stopEngine,
    pressBreakPedal: brake,
    pressGasPedal: accelerate
  }
}();

var modelS = new TeslaCar("Model S");
var modelX = new TeslaCar("Model X");
var temp = new Temp();

modelS.startEngine();
modelS.pressGasPedal();
modelS.pressBreakPedal();
modelS.stopEngine();

modelX.startEngine();
modelX.startEngine();
modelX.startEngine();
modelX.startEngine();


