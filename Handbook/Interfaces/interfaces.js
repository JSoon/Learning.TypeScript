"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function createSquare(config) {
    var newSquare = {
        color: "white",
        area: 6
    };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
var squareOptions = {
    colour: "red"
};
var mySquare = createSquare(squareOptions);
var p1 = {
    x: 10,
    y: 20
};
p1.x = 5; // error!
var noChange = [1, 2, 3, 4, 5];
// let copyNoChange: Array<number> = noChange.push(3)
var canChange = noChange;
canChange.push(6);
var Animal = /** @class */ (function () {
    function Animal(theName) {
        this.name = theName;
    }
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog(name, breed) {
        var _this = _super.call(this, name) || this;
        _this.breed = breed;
        return _this;
    }
    return Dog;
}(Animal));
var myAnimal = new Animal('my animal');
var myDog = new Dog('dog', 'husky');
console.log(myDog);
var dogs;
dogs = [myAnimal, myDog];
var myArray = ["Alice", "Bob"];
myArray[2] = "Mallory"; // error!
var Clock = /** @class */ (function () {
    function Clock(h, m) {
        this.h = h;
        this.m = m;
        this.nation = '中国制造';
    }
    Clock.prototype.tick = function () {
        console.log('滴，答，滴，答', this.nation);
    };
    return Clock;
}());
function createClock(ctor, hour, minute) {
    return new ctor(hour, minute);
}
var myClock = createClock(Clock, 12, 0);
myClock.tick();
var square = {};
square.color = "blue";
square.sideLength = 10;
function getCounter() {
    var counter = (function (start) {
        return String(start);
    });
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
var c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
var Control = /** @class */ (function () {
    function Control() {
        this.state = 1;
    }
    return Control;
}());
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype.select = function () { };
    return Button;
}(Control));
var btn = new Button();
var TextBox = /** @class */ (function (_super) {
    __extends(TextBox, _super);
    function TextBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextBox.prototype.select = function () { };
    return TextBox;
}(Control));
var textBox = new TextBox();
// Error: Property 'state' is missing in type 'Image'.
var MyImage = /** @class */ (function (_super) {
    __extends(MyImage, _super);
    function MyImage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyImage.prototype.select = function () {
        return 'MyImage Class';
    };
    return MyImage;
}(Button));
var myImage = new MyImage();
// class Location {
// }
