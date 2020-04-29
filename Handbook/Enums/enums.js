"use strict";
var Z;
(function (Z) {
    Z[Z["FOO"] = 0] = "FOO";
    Z[Z["BAR"] = 1] = "BAR";
})(Z || (Z = {}));
var Direction;
(function (Direction) {
    Direction["Down"] = "1";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 5] = "Right";
    Direction[Direction["Up"] = 0] = "Up";
})(Direction || (Direction = {}));
Direction.Up;
Direction.Down;
Direction.Left;
Direction.Right;
function getSomeValue(params) {
    return 1;
}
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["ERROR"] = 0] = "ERROR";
    LogLevel[LogLevel["WARN"] = 1] = "WARN";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["DEBUG"] = 3] = "DEBUG";
})(LogLevel || (LogLevel = {}));
function printImportant(key, message) {
    var num = LogLevel[key];
    if (num <= LogLevel.WARN) {
        console.log("Log level key is: ", key);
        console.log("Log level value is: ", num);
        console.log("Log level message is: ", message);
    }
}
printImportant("ERROR", "This is a message");
var Enum;
(function (Enum) {
    Enum[Enum["D"] = 5] = "D";
})(Enum || (Enum = {}));
var aaa = Enum.D;
var b = Enum.B;
