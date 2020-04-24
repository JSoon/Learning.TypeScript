"use strict";
function padLeft(value, padding) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error("Expected string or number, got '" + padding + "'.");
}
console.log(padLeft("Hello world", 4)); // returns "    Hello world"
console.log(padLeft('hello world', 'two'));
var mySize = {
    width: 1,
    height: 1
};
console.log(padLeft("Hello world", mySize));
