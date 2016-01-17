var User = function(name){
    this.name = name;
};

User.prototype.say = function(){
    console.log("User:", this.name);
};

// decorator for User constructor function
var DecoratedUser = function(user, street, city){
    this.user = user;
    this.name = user.name; // ensure interface stays the same
    this.street = street;
    this.city = city;
};

User.prototype.say = function(){
    console.log("Decorated user:", this.name, this.street, this.city);
};

var user = new User("Kelly");
user.say();

var decorated = new DecoratedUser(user, "Broadway", "New York");
decorated.say();
