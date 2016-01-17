// A constructor for defining new cars
function Car(options){
    this.state = options.state || "brand new";
    this.color = options.color || "silver";
    this.doors = options.doors || 4;
}

// A constructor for defining new trucks
function Truck(options){
    this.state = options.state || "used";
    this.color = options.color || "blue";
    this.wheelSize = options.wheelSize || "large";
}

// factory example
// define a skeleton vehicle factory
function VehicleFactory(){}
// default vehicleClass is Car
VehicleFactory.prototype.vehicleClass = Car;
VehicleFactory.prototype.createVehicle = function(options){
    switch(options.vehicleType){
        case "car":
            this.vehicleClass = Car;
            break;
        case "truck":
            this.vehicleClass = Truck;
            break;
    }

    return new this.vehicleClass(options);
};

// subclass VehicleFactory to create a factory class that builds Trucks
function TruckFactory(){}
TruckFactory.prototype = new VehicleFactory();
TruckFactory.prototype.vehicleClass = Truck;


var carFactory = new VehicleFactory();
var car = carFactory.createVehicle({
    vehicleType: "car",
    color: "yellow",
    doors: 6
});

var truckFactory = new TruckFactory();
var truck = truckFactory.createVehicle({
    state: "so bad..",
    color: "pink",
    wheelSize: "so big"
});

console.log("=== instanceof ===");
console.log(car instanceof Car);
console.log(car instanceof Truck);
console.log(truck instanceof Car);
console.log(truck instanceof Truck);

console.log("=== state ===");
console.log(car);
console.log(truck);