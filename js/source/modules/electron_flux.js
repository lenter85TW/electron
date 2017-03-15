/**
 * Created by kimdoeun on 2017. 3. 14..
 */




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



/*var Store = {
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
        windowList.add(winObj);
    },

    removeSubWindow(){

    }


};*/








const EventEmitter = require('events').EventEmitter;

var ipcMain = null;
var ipcRenderer = null;
var remote = null;
var windowList = [];
var main = null;
var rendererStoreObj=null;
var mainStoreObj= null;
const emitter = new EventEmitter();



var mainDispatcher = {

    init(mainIpc){
        ipcMain = mainIpc;
        ipcMain.on('updateStore', (event, dataName, data) => {
            console.log("mainDispatcher 실행", dataName, data);
            if(mainStoreObj[dataName] !== data){
                mainStore.changeData(dataName, data);
            }
        })
    }





};



var rendererAction = {
    init(remdererIpc) {
        ipcRenderer = remdererIpc;
    },

    updateStore(dataName, data){
        console.log("rendereAction - updateStore", dataName, data);
        ipcRenderer.send('updateStore', dataName, data);
    }

};




var mainStore = {


    //mainProcess에서 저장소를 배치할때 글로벌 객체와 저장소에 들어갈 데이터 객체를 주입 받는다.
    init(store){
        mainStoreObj = store;
    },

    addWindow(winObj){
        windowList.push(winObj);
    },

    removeWindow(winObj){
        let index = windowList.indexOf(winObj);
        windowList.splice(index, 1); //index위치에 있는 원소 한개를 삭제 (배열은 자동으로 빈칸을 메꾼다. 자바의 list 컬렉션 처럼)
    },

    changeData(dataName, newData){
        console.log("mainStore - changeData 실행");
        mainStoreObj[dataName] = newData;
        windowList.forEach((currentValue) => {
            console.log("forEach 실행");
            currentValue.webContents.send('dataChanged', dataName);  //webContents로 하면 파라메터를 여러개 보낼 수 있다.
        });
    }
};




var rendererStore = {

    //renderProcess에서 최초로 저장소를 배치할 때 mainProcess에서 저장소를 가지고 온다
    init(rendererRemoteMain, rendererIpc ){
        main = rendererRemoteMain;
        ipcRenderer = rendererIpc;
        rendererStoreObj = main.getStore();  //이렇게 가지고 오면 참조를 가지고 온거라서 메인프로세스에서 스토어가 바뀌면 여기서도 계속 자동으로 바뀐다. moduleTest를 하면서 exports.sum = sum  했던 것과는 다르다 이때는 sum은 안바뀌고 0만 계속 나왔지.
        ipcRenderer.on('dataChanged', this.DataChanged);  //메인프로세스로부터 저장소의 데이터가 변경되었다고 연락이 오면 changeData메소드를 실행한다.
    },

    DataChanged(event, dataName) {   //렌더러 프로세스의 저장소도 데이터를 바꿔주고, 이벤트 방출기emitter로 데이터 이름으로 이벤트를 방출한다.
        //rendererStoreObj[dataName] = newData;
        console.log("renderStore - DataChanged 실행");
        //console.log(rendererStoreObj.sampleBtnToggle);
        emitter.emit(dataName);
    },

    addListener(eventType, func){
        emitter.on(eventType, func);
    },

    removeListener(){

    },




}

function getRenderStoreObj() {
    return rendererStoreObj;
}




exports.mainDispatcher = mainDispatcher;
exports.rendererAction = rendererAction;
exports.mainStore = mainStore;
exports.rendererStore = rendererStore;
exports.getRenderStoreObj = getRenderStoreObj;




