/**
 * Created by kimdoeun on 2017. 3. 13..
 */

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const url = require('url');
const path = require('path');
const ipcMain = electron.ipcMain;

let mainWindow;
let chatRoomWindow;
let chatRoomWindow2;


app.on('ready', () => {
    mainWindow = new BrowserWindow( {width: 800, height: 600});
    mainWindow.loadURL ('file://' + __dirname + '/index.html');
    //mainWindow.webContents.openDevTools();

    //방법2. 처음부터 새로운 윈도우들을 다 만들어 놓고 show 만 false로 해놓는 방법도 있다.
    /*chatRoomWindow = new BrowserWindow({width:300, height: 600, show: false});
    chatRoomWindow.loadURL('file://' + __dirname + '/browsers/chatRoom.html');
    chatRoomWindow.webContents.openDevTools();*/

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
    chatRoomWindow = new BrowserWindow({width: 300, height: 500});
    chatRoomWindow.loadURL('file://' + __dirname + '/browsers/chatRoom.html');


    event.returnValue = 'pong';

});



