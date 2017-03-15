/**
 * Created by kimdoeun on 2017. 3. 15..
 */

const electron = require('electron');
const remote = require('electron').remote;
const main = remote.require('./main.js');

var store = main.getStore();
var mainFunc = main.updateStore;

function func1(){
    mainFunc();
}

function func2 () {
    console.log(store);
}