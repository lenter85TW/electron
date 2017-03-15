'use strict';

/**
 * Created by kimdoeun on 2017. 3. 15..
 */

var electron = require('electron');
var ipcRenderer = electron.ipcRenderer;
var remote = require('electron').remote;
var main = remote.require('./main.js');
var electron_flux = require('../js/build/modules/electron_flux'); //이 상대경로는 html파일을 기준으로 상대경로를 작성해야 된다. 현재의 testwin.js기준의 상대경로가 아니라

var store = electron_flux.rendererStore;
electron_flux.rendererAction.init(ipcRenderer);
store.init(main, ipcRenderer);
store.addListener('sampleBtnToggle', function () {
    console.log("testWin2의 addListener에 등록된 함수 실행");
    console.log(electron_flux.getRenderStoreObj().sampleBtnToggle);
});

function btnClick() {
    console.log("btnclick 실행");
    var bool = !electron_flux.getRenderStoreObj().sampleBtnToggle;
    electron_flux.rendererAction.updateStore('sampleBtnToggle', bool);
}