'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by kimdoeun on 2017. 3. 14..
 */

var EventEmitter = require('events').EventEmitter;

//안됨
/*export default class electron_flux {
    constructor() {
    }

    sum (a, b) {
        return a+b;
    }
}*/

//이건 es5의 commonJS 방식. 이런식으로 export 하면 다른곳에서 require로 쓸 수 있다.
/*exports.sum = function (a, b) {
    return a+b;
}

exports.sum2 = function (a, b) {
    return a+b+3;
}*/

//이렇게 하면 es6 방식이라 바벨로 번역해야 됨
/*const test = {

    sum(a, b) {
        return a+b;
    }
};

export {test}*/

var ipcMain = null;
var ipcRenderer = null;
var remote = null;
var windowList = [];
var main = null;
var rendererStoreObj = null;
var emitter = new EventEmitter();

var Store = {
    init: function init() {
        remote.getGlobal(); //이거 스코프 문제 때문에 안될 것 같은데...일단 해봐야 겠다. 아니면 data를 윈도우 브라우저 처음 생성될때 가져와서 여기다가 세팅하는 것도 방법. 그럼 remote는 필요없겠지.
    },
    getData: function getData(dataNameStr) {
        return data[dataNameStr];
    },
    setData: function setData(dataNameStr, newData, forwardBool) {
        if (getData(dataNameStr) !== newData && forwardBool) {

            ipcRenderer.send('storeChanged', dataNameStr, newData); // main에서 받으면 다시 ipcMain이 저장소 상태 바꾸고 backward로
        } else if (!forwardBool) {
            data[dataNameStr] = newData;
            emitter.emit(dataNameStr);
        }
    },
    addListener: function addListener(eventTypeStr, Func) {
        emitter.addListener(eventTypeStr, Func);
    },
    setIpcRenderer: function setIpcRenderer(Renderer) {
        ipcRenderer = Renderer;
    },
    setRemote: function setRemote(Remote) {
        remote = Remote;
    },
    addSubWindow: function addSubWindow(winObj) {
        windowList.add(winObj);
    },
    removeSubWindow: function removeSubWindow() {}
};

var mainDispatcher = {};

var rendererAction = {};

var mainStore = {

    //mainProcess에서 저장소를 배치할때 글로벌 객체와 저장소에 들어갈 데이터 객체를 주입 받는다.
    init: function init(mainIpc) {
        ipcMain = mainIpc;
    },
    addWindow: function addWindow(winObj) {
        windowList.add(winObj);
    },
    removeWindow: function removeWindow(winObj) {
        var index = windowList.indexOf(winObj);
        windowList.splice(index, 1); //index위치에 있는 원소 한개를 삭제 (배열은 자동으로 빈칸을 메꾼다. 자바의 list 컬렉션 처럼)
    },
    changeData: function changeData(dataName, newData) {
        if (global.storeData[dataName] !== newData) {
            global.storeData[dataName] = newData;
            windowList.forEach(function (currentValue) {
                currentValue.webContents.send('dataChanged', dataName, newData); //webContents로 하면 파라메터를 여러개 보낼 수 있다.
            });
        }
    }
};

var rendererStore = {

    //renderProcess에서 최초로 저장소를 배치할 때 mainProcess에서 저장소를 가지고 온다
    init: function init(rendererRemoteMain, rendererIpc) {
        main = rendererRemoteMain;
        ipcRenderer = rendererIpc;
        rendererStoreObj = main.getStore(); //이렇게 가지고 오면 복사해온건지 참조만 가지고 온건지 테스트 해봐야 하겠어.
        ipcRenderer.on('dataChanged', this.changeData); //메인프로세스로부터 저장소의 데이터가 변경되었다고 연락이 오면 changeData메소드를 실행한다.
    },
    changeData: function changeData(event, dataName, newData) {
        //렌더러 프로세스의 저장소도 데이터를 바꿔주고, 이벤트 방출기emitter로 데이터 이름으로 이벤트를 방출한다.
        rendererStoreObj[dataName] = newData;
        emitter(dataName + ' changed');
    },
    addListener: function addListener(eventType, func) {
        emitter.addListener(eventType, func);
    }
};

exports.Store = Store;
exports.mainDispatcher = mainDispatcher;
exports.rendererAction = rendererAction;
exports.mainStore = mainStore;
exports.rendererStore = rendererStore;