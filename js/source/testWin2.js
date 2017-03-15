/**
 * Created by kimdoeun on 2017. 3. 15..
 */

const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
const remote = require('electron').remote;
const main = remote.require('./main.js');
const electron_flux = require('../js/build/modules/electron_flux'); //이 상대경로는 html파일을 기준으로 상대경로를 작성해야 된다. 현재의 testwin.js기준의 상대경로가 아니라

var store = electron_flux.rendererStore;
electron_flux.rendererAction.init(ipcRenderer);
store.init(main, ipcRenderer);
store.addListener('sampleBtnToggle', () => {
    console.log("testWin2의 addListener에 등록된 함수 실행");
    console.log(electron_flux.getRenderStoreObj().sampleBtnToggle);
});

function btnClick (){
    console.log("btnclick 실행");
    var bool = !electron_flux.getRenderStoreObj().sampleBtnToggle;
    electron_flux.rendererAction.updateStore('sampleBtnToggle', bool);
}