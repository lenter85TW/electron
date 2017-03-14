/**
 * Created by kimdoeun on 2017. 3. 13..
 */

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const url = require('url');
const path = require('path');
const ipcMain = electron.ipcMain;
//onst electron_flux = require('./js/build/modules/electron_flux');
var gitmoduletest = require('gitmoduletest');  //내가 만들어서 깃허브에 올린 모듈을 가지고 와보자.

let mainWindow;
let chatRoomWindow;
let chatRoomWindow2;


app.on('ready', () => {
    mainWindow = new BrowserWindow( {width: 800, height: 600});
    mainWindow.loadURL ('file://' + __dirname + '/index.html');
    //mainWindow.webContents.openDevTools();

     /*chatRoomWindow1 = new BrowserWindow({width: 300, height: 500});
     chatRoomWindow1.loadURL('file://' + __dirname + '/browsers/chatRoom.html');

     chatRoomWindow2 = new BrowserWindow({width: 300, height: 500});
     chatRoomWindow2.loadURL('file://' + __dirname + '/browsers/chatRoom2.html');*/

    //방법2. 처음부터 새로운 윈도우들을 다 만들어 놓고 show 만 false로 해놓는 방법도 있다.
    /*chatRoomWindow = new BrowserWindow({width:300, height: 600, show: false});
    chatRoomWindow.loadURL('file://' + __dirname + '/browsers/chatRoom.html');
    chatRoomWindow.webContents.openDevTools();*/

    //console.log(electron_flux.sum(2,3));
    //console.log(electron_flux.sum2(2,3));
    //console.log(electron_flux.test.sum(2,3)); 안됨
    global.doeun = "김도은";  //처음에 앱이 로드 되었을 때 글로벌 객체에 doeun 프로퍼티를 추가해준다. 내용은 '김도은'

})




ipcMain.on('synchronous-message', function (event, arg) {
    //send back a greeting
    console.log(arg);

    //방법1.
    /*chatRoomWindow  = new BrowserWindow({width: 300, height: 500});
    chatRoomWindow.loadURL(url.format({
        pathname: path.join(__dirname + '/browsers/', 'chatRoom.html'),
        protocol: 'file:',
        slashes: true
    }));*/

    //방법2.
    //chatRoomWindow.show = true;

    //방법3. 방법1은 조금 복잡하니 이처럼 하는게 쉬울 듯
    /*chatRoomWindow = new BrowserWindow({width: 300, height: 500});
    chatRoomWindow.loadURL('file://' + __dirname + '/browsers/chatRoom.html');*/


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







