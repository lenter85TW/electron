"use strict";

/**
 * Created by kimdoeun on 2017. 3. 14..
 */

//안됨
/*export default class electron_flux {
    constructor() {
    }

    sum (a, b) {
        return a+b;
    }
}*/

exports.sum = function (a, b) {
    return a + b;
};

exports.sum2 = function (a, b) {
    return a + b + 3;
};

//안됨
/*const test = {

    sum: function (a, b) {
        return a+b;
    }
}

export default test;*/