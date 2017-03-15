'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.test = undefined;

var _fbemitter = require('fbemitter');

//안됨
/*export default class electron_flux {
    constructor() {
    }

    sum (a, b) {
        return a+b;
    }
}*/

//이런식으로 export 하면 다른곳에서 require로 쓸 수 있다.
/*exports.sum = function (a, b) {
    return a+b;
}

exports.sum2 = function (a, b) {
    return a+b+3;
}*/

//안됨
var test = {
    sum: function sum(a, b) {
        return a + b;
    }
}; /**
    * Created by kimdoeun on 2017. 3. 14..
    */

exports.test = test;


var emitter = new _fbemitter.EventEmitter();

var Store = {};