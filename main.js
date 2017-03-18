/**
 * Created by kimdoeun on 2017. 3. 13..
 */

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const sys = require('util');
const path = require('path');
const spawn = require('child_process').spawnSync;
const ipcMain = electron.ipcMain;

let mainWindow;
let chatRoomWindow;
let chatRoomWindow2;


app.on('ready', () => {
    mainWindow = new BrowserWindow( {width: 800, height: 600, icon:__dirname + '/logo.ico'});  //여기서 icon은 앱을 실행했을때 왼쪽 상단에 뜨는 아이콘
    mainWindow.loadURL ('file://' + __dirname + '/index.html');
    mainWindow.webContents.openDevTools();

    if (handleStartupEvent()) {
      return;
    }

})




ipcMain.on('synchronous-message', function (event, arg) {


});


var handleStartupEvent = function() {
  if (process.platform !== 'win32') {
        return false;
    }

    var exe = process.execPath;
    var updater = path.resolve(path.dirname(exe), '..', 'Update.exe');
    var squirrelCommand = process.argv[1];

    switch (squirrelCommand) {
        case '--squirrel-install':
        case '--squirrel-updated':
            sys.log('Creating shortcuts--2')
            spawn(updater, ['--createShortcut', exe])
            app.quit();
            return true;
        case '--squirrel-uninstall':
            sys.log('Removing shortcuts')
            spawn(updater, ['--removeShortcut', exe])
            app.quit();
            return true;
        case '--squirrel-obsolete':
            sys.log('Getting a makeover')
            app.quit();
            return true;
    }
};
