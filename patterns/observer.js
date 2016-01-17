/**
 * Observer design pattern - updating of one part of application causes update process for other necessary parts
 */

var _ = require("underscore");

var Subject = function() {
    this.observers = [];
};

Subject.prototype = function() {
    return {
        subscribeObserver: function(observer){
            this.observers.push(observer);
        },
        unsubscribeObjserver: function(observer){
            var index = this.observers.indexOf(observer);
            if(index !== -1){
                this.observers = _.reject(this.observers, function(observer, key){
                    return key === index;
                });
            }
        },
        notifyObserver: function(observer){
            var index = this.observers.indexOf(observer);
            if(index !== -1){
                this.observers[index].notify(index);
            }
        },
        notifyAllObservers: function(){
            for(var i = 0; i < this.observers.length; i++){
                this.observers[i].notify(i);
            }
        }
    }
}();

var Observer = function(){
    return {
        notify: function(index){
            console.log("Observer " + index + " is notified!");
        }
    }
};

var subject = new Subject();

var observer1 = new Observer();
var observer2 = new Observer();
var observer3 = new Observer();
var observer4 = new Observer();
var observer5 = new Observer();

console.log("=== Subscribe observers... ===");
subject.subscribeObserver(observer1);
subject.subscribeObserver(observer2);
subject.subscribeObserver(observer3);
subject.subscribeObserver(observer4);
subject.subscribeObserver(observer5);

console.log("=== Notify single observer... ===");
subject.notifyObserver(observer3);

console.log("=== Notify all observers... ===");
subject.notifyAllObservers();

console.log("=== Unsubscribe single observer... ===");
subject.unsubscribeObjserver(observer5);

console.log("=== Notify all observers... ===");
subject.notifyAllObservers();