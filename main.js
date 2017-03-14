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

    console.log(electron_flux.sum(2,3));
    console.log(electron_flux.sum2(2,3));
    //console.log(electron_flux.test.sum(2,3)); 안됨

})




ipcMain.on('synchronous-message', function (event, arg) {
    //send back a greeting
    //console.log(arg);

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
});





