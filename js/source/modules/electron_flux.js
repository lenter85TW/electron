/**
 * Created by kimdoeun on 2017. 3. 14..
 */

const EventEmitter = require('events').EventEmitter;


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

let data = {};
let ipcRenderer = null;
let remote = null;

const emitter = new EventEmitter();
let subWindowList = [];

const Store = {
    init(){
        remote.getGlobal(); //이거 스코프 문제 때문에 안될 것 같은데...일단 해봐야 겠다. 아니면 data를 윈도우 브라우저 처음 생성될때 가져와서 여기다가 세팅하는 것도 방법. 그럼 remote는 필요없겠지.
    },

    getData(dataNameStr){
        return data[dataNameStr];
    },

    setData(dataNameStr, newData, forwardBool) {
        if( (getData(dataNameStr) !== newData) && forwardBool) {

            ipcRenderer.send('storeChanged', dataNameStr, newData); // main에서 받으면 다시 ipcMain이 저장소 상태 바꾸고 backward로
            
        } else if ( !forwardBool ) {
            data[dataNameStr] = newData;
            emitter.emit(dataNameStr);
        }
    },

    addListener(eventTypeStr, Func) {
        emitter.addListener(eventTypeStr, Func);
    },

    setIpcRenderer(Renderer) {
        ipcRenderer = Renderer;
    },

    setRemote(Remote){
        remote = Remote;
    },

    addSubWindow(winObj){
        subWindowList.add(winObj);
    },

    removeSubWindow(){

    }


};




export {Store};



