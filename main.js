/**
 * Created by kimdoeun on 2017. 3. 13..
 */

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const url = require('url');
const path = require('path');
const ipcMain = electron.ipcMain;
const electron_flux = require('./js/build/modules/electron_flux');
var gitmoduletest = require('gitmoduletest');  //내가 만들어서 깃허브에 올린 모듈을 가지고 와보자.

let mainWindow;
let chatRoomWindow;
let chatRoomWindow2;


app.on('ready', () => {
    mainWindow = new BrowserWindow( {width: 800, height: 600});
    mainWindow.loadURL ('file://' + __dirname + '/index.html');
    //mainWindow.webContents.openDevTools();


    //console.log(electron_flux.sum(2,3));
    //console.log(electron_flux.sum2(2,3));
    //console.log(electron_flux.test.sum(2,6));
    global.doeun = "김도은";  //처음에 앱이 로드 되었을 때 글로벌 객체에 doeun 프로퍼티를 추가해준다. 내용은 '김도은'

})




ipcMain.on('synchronous-message', function (event, arg) {
    //send back a greeting
    console.log(arg);


    event.returnValue = 'pong';

});

ipcMain.on('asynchronous-message', (event, arg) => {
    console.log(arg);
    event.sender.send('asynchronous-reply', arg);

    //chatRoomWindow1.webContents.send('asynchronous-reply', arg);  //이렇게 메세지를 받을 브라우저들을 직접 지정해서 send를 해줘야 여러 브라우저가 동시에 같은 메세지를 받을 수 있다.
    //chatRoomWindow2.webContents.send('asynchronous-reply', arg);

    global.doeun = arg.type;  //이벤트가 발생해서 ipcMain이 데이터를 받으면 그 내용으로 다시 글로벌 객체의 doeun프로퍼티 내용을 바꾼다.
    console.log(gitmoduletest.getSum());  //renderer process에서 lenterSum을 실행해도 여기서 getSum는 거엔 관련이 없다. 계속 0만 나온다. 다른 renderer process 사이에서도 마찬가지이다 계속 0 나온다.
});







