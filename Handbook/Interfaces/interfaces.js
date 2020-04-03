"use strict";
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
var mySquare = createSquare({
    color: 'red'
});
var p1 = {
    x: 10,
    y: 20
};
p1.x = 5; // error!
var noChange = [1, 2, 3, 4, 5];
// let copyNoChange: Array<number> = noChange.push(3)
var canChange = noChange;
canChange.push(6);
