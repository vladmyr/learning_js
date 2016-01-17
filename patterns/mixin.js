var _ = require("underscore");

// Example #1
var myMixin = {
    moveUp: function(){
        console.log("move up");
    },
    moveDown: function(){
        console.log("move down");
    },
    stop: function(){
        console.log("stop!");
    }
};

function CarAnimator(){
    this.moveLeft = function(){
        console.log("move left");
    };
}

function PersonAnimator(){
    this.moveRandomly = function(){
        console.log("move randomly");
    };
}

_.extend(CarAnimator.prototype, myMixin);
_.extend(PersonAnimator.prototype, myMixin);

var carAnimator = new CarAnimator();
var personAnimator = new PersonAnimator();

console.log("=== Example #1 ===");
console.log("= carAnimator =");
carAnimator.moveLeft();
carAnimator.moveDown();
carAnimator.stop();
console.log(typeof carAnimator.moveRandomly);

console.log("= personAnimator =");
personAnimator.moveRandomly();
personAnimator.moveUp();
personAnimator.moveDown();
console.log(typeof personAnimator.moveLeft);

// Example #2
var Car = function(settings){
    this.model = settings.model || "no model provided";
    this.color = settings.color || "no color provide";
};

var Mixin = function(){};
Mixin.prototype = {
    driveForward : function(){
        console.log("drive forward");
    },
    driveBackward: function(){
        console.log("drive backward");
    },
    driveSideways: function(){
        console.log("drive sideways");
    }
};

// Extend an existing object wit a method from another (augment = extend)
function augment(receivingClass, givingClass) {
    if(arguments[2]) {
        // only provide certain methods
        for(var i = 2, len = arguments.length; i < len; i++){
            receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
        }
    } else {
        // provide all methods
        for(var methodName in givingClass.prototype){
            // check to make sure the receiving class doesn't have a method of
            // the same name as the one currently being processed
            if(!Object.hasOwnProperty.call(receivingClass.prototype, methodName)){
                receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            }
        }
    }
}

console.log("=== Example #2 ===");

augment(Car, Mixin, "driveForward", "driveBackward");

var myCar = new Car({
    model: "From Escort",
    color: "blue"
});

console.log("= myCar =");
myCar.driveForward();
myCar.driveBackward();
console.log(typeof myCar.driveSideways);

augment(Car, Mixin);

var mySportCar = new Car({
    model: "Porshe",
    color: "red"
});

console.log("= sportcar =");
mySportCar.driveSideways();