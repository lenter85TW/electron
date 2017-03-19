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
const nativeImage = electron.nativeImage;

let mainWindow;
let chatRoomWindow;
let chatRoomWindow2;




app.on('ready', () => {
    mainWindow = new BrowserWindow( {width: 800, height: 600, icon:__dirname + '/logo.ico'});  //여기서 icon은 앱을 실행했을때 왼쪽 상단에 뜨는 아이콘
    mainWindow.loadURL ('file://' + __dirname + '/index.html');
    mainWindow.webContents.openDevTools();
    //overlay이미지 표시

    //mainWindow.setOverlayIcon(nativeImage.createEmpty(), '');


    if (handleStartupEvent()) {
      return;
    }

})


ipcMain.on('badge-message', function (event, arg) {  //렌더러 프로세스로 부터 badge-message이벤트를 받고, 매개변수로 canvas의 dataURL주소를 받는다.
  //console.log(arg);
  var newImage = nativeImage.createFromDataURL(arg); //createFromDataURL메소드로 native이미지(png나 jpeg같은 것)를 생성한다.
  mainWindow.setOverlayIcon(newImage, '');

});


//처음에 앱이 시작되고 'ready'가 되었을 때 이 함수를 실행한다. squirrel이벤트라는 걸 통해 switch-case문을 시작한다.
//처음 install이되거나 update가 되었을때 update.exe를 실행하며 옵션으로 createshortcut도 실해한다. uninstall이벤트는 그 반대 작업.
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
