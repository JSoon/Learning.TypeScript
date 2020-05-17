"use strict";
var hello;
(function (hello) {
    hello.foo = 'foo';
    hello.bar = 'bar';
})(hello || (hello = {}));
