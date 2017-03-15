'use strict';

/**
 * Created by kimdoeun on 2017. 3. 15..
 */

var electron = require('electron');
var remote = require('electron').remote;
var main = remote.require('./main.js');

var store = main.getStore();
var mainFunc = main.updateStore;

function func1() {
    mainFunc();
}

function func2() {
    console.log(store);
}