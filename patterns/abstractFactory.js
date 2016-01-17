// example #1
// A constructor for defining new cars
function Car(options){
    this.state = options.state || "brand new";
    this.color = options.color || "silver";
    this.doors = options.doors || 4;
}

Car.prototype.drive = function(){
    // drive...
};

Car.prototype.breakDown = function(){
    // break down...
};

// A constructor for defining new trucks
function Truck(options){
    // attributes
    this.state = options.state || "used";
    this.color = options.color || "blue";
    this.wheelSize = options.wheelSize || "large";
}

Truck.prototype.drive = function(){
    // drive...
};

Truck.prototype.breakDown = function(){
    // break down...
};

var abstractVehicleFactory = (function(){
    var types = {};

    return {
        getVehicle: function(type, customizations){
            var Vehicle = types[type];
            return (Vehicle
                ? new Vehicle(customizations)
                : null);
        },
        registerVehicle: function(type, Vehicle){
            var proto = Vehicle.prototype;

            // only register classes that fulfill the vehicle contract
            if(proto.drive && proto.breakDown){
                types[type] = Vehicle;
            }

            return abstractVehicleFactory;
        }
    }
})();

// Usage:
abstractVehicleFactory.registerVehicle("car", Car);
abstractVehicleFactory.registerVehicle("truck", Truck);

var car = abstractVehicleFactory.getVehicle("car", {
    color: "lime green",
    state: "like new"
});

var truck = abstractVehicleFactory.getVehicle("truck", {
    wheelSize: "medium",
    color: "neon yellow"
});

console.log("=== instanceof ===");
console.log(car instanceof Car);
console.log(car instanceof Truck);
console.log(truck instanceof Car);
console.log(truck instanceof Truck);

console.log("=== state ===");
console.log(car);
console.log(truck);