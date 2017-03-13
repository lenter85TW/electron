/**
 * Created by kimdoeun on 2017. 3. 13..
 */

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const ipcMain = electron.ipcMain;
const ipcRenderer = electron.ipcRenderer;


app.on('ready', () => {
    mainWindow = new BrowserWindow( {width: 800, height: 600});
    mainWindow.loadURL ('file://' + __dirname + '/index.html');
    mainWindow.webContents.openDevTools();

})

app.on('chatRoom', () => {
    chatRoom = new BrowserWindow( {width: 800, height: 600});
    mainWindow.loadURL ('file://' + __dirname + '/browsers/chatRoom.html');
});

/*ipcMain.on('ping', function (event, arg) {
    if (arg === 'hello') {
        //send back a greeting
        event.sender.send('pong', 'Hello, world!');
    }
});*/


//console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) ;


