"use strict";
var Greeter = /** @class */ (function () {
    function Greeter() {
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    Greeter.hehe = 'hehe';
    return Greeter;
}());
var myGreeter = Greeter;
Greeter.hehe = 'haha';
console.log(myGreeter === Greeter);
