/**
 * Singleton pattern with an initialization arguments
 */

var SingletonTester = (function(){
    var instance;

    function Singleton(options){
        options = options || {};

        this.name = "SingletonTester";
        this.pointX = options.pointX || 7;
        this.pointY = options.pointY || 10;
    }

    var _static = {
        name: "SingletonTester",
        getInstance: function(options){
            if(typeof instance === "undefined"){
                instance = new Singleton(options);
            }

            return instance;
        }
    };

    return _static;
})();
// Initialization is performed during the first call
//var singletonTest0 = SingletonTester.getInstance();
var singletonTest1 = SingletonTester.getInstance({
    pointX: 5
});
var singletonTest2 = SingletonTester.getInstance();

//console.log(singletonTest0.pointX, singletonTest1.pointX, singletonTest2.pointX); // output: 7 7 7
console.log(singletonTest1.pointX, singletonTest2.pointX);  // output: 5 5