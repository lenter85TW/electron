/**
 * Created by KIM DOEUN on 2017-05-03.
 */

/**
 * Created by kimdoeun on 2017. 3. 16..
 */

var EventEmitter = require('events').EventEmitter;

var ipcMain = null;
var ipcRenderer = null;
var remote = null;
var windowList = [];
var main222 = null;
var mainStoreObj = null;
var emitter = new EventEmitter();

////
var mainWindowListMap = new Map();




var mainDispatcher = {
    init: function init(mainIpc) {
        ipcMain = mainIpc;
        ipcMain.on('updateStore', function (event, dataName, data) {
            //console.log("mainDispatcher 실행", dataName, data);
            if (mainStoreObj[dataName] !== data) {
                mainProcess.changeData(dataName, data);
            }
        });
    }
};

var mainWindowCRUD = {
    init: function init(mainIpc, BrowserWindow) {
        ipcMain = mainIpc;

        ipcMain.on('createNewWindow', function (event, newWindowName, informationDataObj, htmlFileUrl, frameBoolean=true, forceOpenWindowAndReplaceItBoolean=false) {
            console.log("createNewWindow 실행", newWindowName, informationDataObj, htmlFileUrl, forceOpenWindowAndReplaceItBoolean);

            //이미 해당 이름으로 윈도우가 열려있지 않다면
            if(mainWindowListMap.get(newWindowName) == null) {
                console.log('new window create');
                //새로운 윈도우 생성하고 열자
                var newBrowser = new BrowserWindow({width: informationDataObj.width, height: informationDataObj.height, frame:frameBoolean});

                newBrowser.on('closed', () => {
                    console.log('window closed event receive');
                    mainProcess.removeWindow(newWindowName);
                    newBrowser = null;
                })

                newBrowser.loadURL(htmlFileUrl);
                mainProcess.addWindow(newWindowName, newBrowser);

                //이미 해당 이름으로 윈도우가 열려 있는 상태라면
            } else {
                //똑같은 이름으로 새로운 윈도우 브라우저로 대체하고 싶다면
                if(forceOpenWindowAndReplaceItBoolean === true){
                    //일단 종료시킬 윈도우를 맵에서 가져오고
                    var browser = mainWindowListMap.get(newWindowName);
                    if(browser != null){
                        //윈도우 리스트 저장맵에서 삭제시켜준후
                        mainProcess.removeWindow(newWindowName);
                        //윈도우 종료.
                        browser.close();
                    }

                    console.log('new window replace old window');
                    //새로 다시 윈도우 만들고 windowListMap에 추가해주고 윈도우도 열자.
                    var newBrowser = new BrowserWindow({width: informationDataObj.width, height: informationDataObj.height, frame:frameBoolean});

                    newBrowser.on('closed', () => {
                        console.log('replaced window closed event receive');
                        mainProcess.removeWindow(newWindowName);
                        newBrowser = null;
                    })

                    newBrowser.loadURL(htmlFileUrl);
                    mainProcess.addWindow(newWindowName, newBrowser);


                } else {
                    console.log('nothing happened')
                    // 아무 일도 안한다.
                }
            }

        });

        ipcMain.on('closeWindow', function (event, windowNameToClose, callBackFunctionBeforeWindowClosed, callBackFunctionAfterWindowClosed) {
            console.log("windowNameToClose 실행", windowNameToClose);

            //일단 종료시킬 윈도우를 맵에서 가져오고
            var browser = mainWindowListMap.get(windowNameToClose);
            if(browser != null){
                if(callBackFunctionBeforeWindowClosed !== null){
                    callBackFunctionBeforeWindowClosed();
                }


                //윈도우 리스트 저장맵에서 삭제시켜준후
                mainProcess.removeWindow(windowNameToClose);

                //윈도우 종료.
                browser.close();

                if(callBackFunctionAfterWindowClosed !== null){
                    callBackFunctionAfterWindowClosed();
                }

            }


        });

    }
};


var rendererAction = {
    init: function init(remdererIpc) {
        ipcRenderer = remdererIpc;
    },
    updateStore: function updateStore(dataName, data) {
        //console.log("rendereAction - updateStore", dataName, data);
        ipcRenderer.send('updateStore', dataName, data);
    },

    createNewWindow: function createNewWindow(newWindowName, informationDataObj, htmlFileUrl, frameBoolean, forceOpenWindowAndReplaceItBoolean) {
        console.log('createNewWindow 실행');
        ipcRenderer.send('createNewWindow', newWindowName, informationDataObj, htmlFileUrl, frameBoolean, forceOpenWindowAndReplaceItBoolean);
    },

    closeWindow: function closeWindow(windowNameToClose, callBackFunctionBeforeWindowClosed, callBackFunctionAfterWindowClosed) {
        console.log('closeWindow 실행');
        ipcRenderer.send('closeWindow', windowNameToClose);
    }


};

var mainProcess = {
    /////
    init: function init(store, windowListMap, ipcMain) {
        mainStoreObj = store;
        mainWindowListMap = windowListMap;
        console.log('mainProcessInit ', store, windowListMap);
        ipcMain.on('getStore', function (event) {
            event.sender.send('getStoreReply', store);
        });

        ipcMain.on('getWindowListMap', function (event) {
            console.log('windowlistmap')
            event.sender.send('getWindowListMapReply', JSON.stringify({
                props: 'props',
                method: function(){console.log('i am function')}
            }));
        });
    },



    //////
    addWindow : function addWindow(key, windowObj){
        mainWindowListMap.set(key, windowObj);
    },


    //////
    removeWindow: function removeWindow(key) {
        mainWindowListMap.delete(key);
    },



    changeData: function changData(dataName, newData){
        //console.log('electron_flux - changeData excute', dataName, newData);
        mainStoreObj[dataName] = newData;
        mainWindowListMap.forEach(function (currentValue, key) {
            //console.log('electron_flux - changeData ForEach execute',  key, currentValue);
            currentValue.webContents.send('dataChanged', dataName);
        });
    }


};

var rendererProcess = {


    init: function init(rendererIpc) {
        ipcRenderer = rendererIpc;
        ipcRenderer.send('getStore')
        ipcRenderer.send('getWindowListMap')
        ipcRenderer.on('dataChanged', this.DataChanged);
        ipcRenderer.on('getStoreReply', (arg, arg2) => {
            console.log('getStoreReply accept', arg2);
            mainStoreObj = arg2;
        });
        ipcRenderer.on('getWindowListMapReply', (arg, arg2) => {
            console.log('getWindowListMapReply accept', arg2);
            console.log('getStoreReply parse', JSON.parse(arg2));
            mainWindowListMap = arg2;
        });
    },
    DataChanged: function DataChanged(event, dataName) {

        emitter.emit(dataName);
    },
    addListener: function addListener(eventType, func) {
        emitter.on(eventType, func);
    },
    removeListener: function removeListener(eventType, func) {
        emitter.removeListener(eventType, func);
    }
};

function getMainStoreObj() {


    return mainStoreObj;
}


function getMainWindowListMap() {


    return mainWindowListMap;
}

exports.mainDispatcher = mainDispatcher;
exports.rendererAction = rendererAction;
exports.mainProcess = mainProcess;
exports.rendererProcess = rendererProcess;
exports.mainWindowCRUD = mainWindowCRUD;
exports.getMainStoreObj = getMainStoreObj;
exports.getMainWindowListMap = getMainWindowListMap;