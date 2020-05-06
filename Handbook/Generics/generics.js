"use strict";
// function identity<T>(arg: T[]): T[] {
//   arg.length
//   return arg;
// }
function genericIdentity(arg) {
    return arg;
}
var myIdentity = genericIdentity;
myIdentity('string');
function identity(arg) {
    return arg;
}
var myIdentity2 = identity;
var GenericNumber = /** @class */ (function () {
    function GenericNumber() {
    }
    return GenericNumber;
}());
var myGenericNumber = new GenericNumber();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
    return x + y;
};
