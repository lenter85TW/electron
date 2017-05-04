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
const electron_flux = require('./electron_flux');
const fs = require('fs');


let mainWindow;
let chatRoomWindow;
let chatRoomWindow2;

store = {
    test: 'test',
    method: function(){console.log('method 야')}
}


var mainWindowListMap = new Map();

//글로벌 객체 넘기기
global.storeObj = store;
global.mainWindowListMap = mainWindowListMap;

function getStore () {
    console.log('getStore execute')
    return store;
}

global.getStoreFunc = getStore;


app.on('ready', () => {
    electron_flux.mainProcess.init(store, mainWindowListMap, ipcMain);
    electron_flux.mainDispatcher.init(ipcMain);

    mainWindow = new BrowserWindow( {width: 1500, height: 1200, icon:__dirname + '/logo.ico'});  //여기서 icon은 앱을 실행했을때 왼쪽 상단에 뜨는 아이콘
    mainWindow.loadURL ('file://' + __dirname + '/index.html');
    mainWindow.webContents.openDevTools();

    if (handleStartupEvent()) {
      return;
    }

    dbTransferAndDeleteOldVersionFolder('./testFolder');

})




ipcMain.on('synchronous-message', function (event, arg) {


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


function dbTransferAndDeleteOldVersionFolder(dirPath){
    console.log(fs.readdirSync(dirPath));
    var files = fs.readdirSync(dirPath);

    console.log(app.getVersion());

    files.forEach( (currentValue) => {
        //폴더일 경우만 체크
        if( fs.statSync(dirPath + '/' + currentValue).isDirectory()){
            console.log('it is folder : ', dirPath, currentValue);
            var splitFolderNameArr = currentValue.split('-');
            console.log(splitFolderNameArr[0], splitFolderNameArr[1]);

            //구버전 폴더가 있다면
            if( splitFolderNameArr[0] === 'app'  && splitFolderNameArr[1] !== app.getVersion()) {
                console.log('oldversion exist : ', splitFolderNameArr[0] + splitFolderNameArr[1]);
                copyRecursiveSync(dirPath + '/' + currentValue + '/realmDBFile', dirPath + '/app-' + app.getVersion() + '/realmDBFile');
                removeDirectory(dirPath + '/' + currentValue);
            }    
        }
        

    })


}


function removeDirectory (dirPath) {
    try { var files = fs.readdirSync(dirPath); }
    catch(e) { return; }
    if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
            var filePath = dirPath + '/' + files[i];
            if (fs.statSync(filePath).isFile()){
                fs.unlinkSync(filePath);
            } else {
                removeDirectory(filePath);
            }
        }
    fs.rmdirSync(dirPath);
};

function copyRecursiveSync(src, dest) {
    var exists = fs.existsSync(src);
    var stats = exists && fs.statSync(src);
    var isDirectory = exists && stats.isDirectory();
    if (exists && isDirectory) {
        fs.mkdirSync(dest);
        fs.readdirSync(src).forEach(function(childItemName) {
            copyRecursiveSync(path.join(src, childItemName),
                path.join(dest, childItemName));
        });
    } else {
        fs.linkSync(src, dest);
    }
};