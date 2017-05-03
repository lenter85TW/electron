/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/* unknown exports provided */
/* all exports used */
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/* unknown exports provided */
/* all exports used */
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 2 */
/* unknown exports provided */
/* all exports used */
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),
/* 3 */
/* unknown exports provided */
/* all exports used */
/*!**********************************!*\
  !*** ./components/MenuButton.js ***!
  \**********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ 0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(/*! react-dom */ 1);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _electron_flux = __webpack_require__(/*! ../../../electron_flux */ 4);

var _electron_flux2 = _interopRequireDefault(_electron_flux);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by kimdoeun on 2017. 3. 13..
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var electron = __webpack_require__(/*! electron */ 2);
var ipcRenderer = electron.ipcRenderer;
var realm = __webpack_require__(/*! ../realm/realm */ 6);
var remote = __webpack_require__(/*! electron */ 2).remote;
var main = remote.require('./main.js'); //경로 주의.

var MenuButton = function (_React$Component) {
    _inherits(MenuButton, _React$Component);

    function MenuButton(props) {
        _classCallCheck(this, MenuButton);

        var _this = _possibleConstructorReturn(this, (MenuButton.__proto__ || Object.getPrototypeOf(MenuButton)).call(this, props));

        _this.state = {};
        console.log('MenuButton remote : ', remote);
        console.log('MenuButton main : ', main);
        // var store = ipcRenderer.sendSync('getstore');
        // console.log(store);

        _electron_flux2.default.rendererAction.init(ipcRenderer);
        //electron_flux.rendererProcess.init(main, ipcRenderer);


        console.log(_electron_flux2.default.getMainStoreObj().test);
        return _this;
    }

    _createClass(MenuButton, [{
        key: 'onBtnClick',
        value: function onBtnClick() {
            console.log("onBtnClick1, 데이터 추가");
            realm.write(function () {
                realm.create('Car', { make: 'Honda', model: 'Accord', drive: 'awd' });
            });
        }
    }, {
        key: 'onBtnClick2',
        value: function onBtnClick2() {
            console.log("onBtnClick2, 데이터 로드");
            console.log(realm.objects('Car'));
        }
    }, {
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'button',
                    { onClick: this.onBtnClick },
                    '\uB370\uC774\uD130 \uCD94\uAC00'
                ),
                _react2.default.createElement(
                    'button',
                    { onClick: this.onBtnClick2 },
                    '\uB370\uC774\uD130 \uB85C\uB4DC'
                )
            );
        }
    }]);

    return MenuButton;
}(_react2.default.Component);

exports.default = MenuButton;

/***/ }),
/* 4 */
/* unknown exports provided */
/* all exports used */
/*!****************************************!*\
  !*** C:/electronTest/electron_flux.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by KIM DOEUN on 2017-05-03.
 */

/**
 * Created by kimdoeun on 2017. 3. 16..
 */

var EventEmitter = __webpack_require__(/*! events */ 7).EventEmitter;

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

        ipcMain.on('createNewWindow', function (event, newWindowName, informationDataObj, htmlFileUrl) {
            var frameBoolean = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
            var forceOpenWindowAndReplaceItBoolean = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

            console.log("createNewWindow 실행", newWindowName, informationDataObj, htmlFileUrl, forceOpenWindowAndReplaceItBoolean);

            //이미 해당 이름으로 윈도우가 열려있지 않다면
            if (mainWindowListMap.get(newWindowName) == null) {
                console.log('new window create');
                //새로운 윈도우 생성하고 열자
                var newBrowser = new BrowserWindow({ width: informationDataObj.width, height: informationDataObj.height, frame: frameBoolean });

                newBrowser.on('closed', function () {
                    console.log('window closed event receive');
                    mainProcess.removeWindow(newWindowName);
                    newBrowser = null;
                });

                newBrowser.loadURL(htmlFileUrl);
                mainProcess.addWindow(newWindowName, newBrowser);

                //이미 해당 이름으로 윈도우가 열려 있는 상태라면
            } else {
                //똑같은 이름으로 새로운 윈도우 브라우저로 대체하고 싶다면
                if (forceOpenWindowAndReplaceItBoolean === true) {
                    //일단 종료시킬 윈도우를 맵에서 가져오고
                    var browser = mainWindowListMap.get(newWindowName);
                    if (browser != null) {
                        //윈도우 리스트 저장맵에서 삭제시켜준후
                        mainProcess.removeWindow(newWindowName);
                        //윈도우 종료.
                        browser.close();
                    }

                    console.log('new window replace old window');
                    //새로 다시 윈도우 만들고 windowListMap에 추가해주고 윈도우도 열자.
                    var newBrowser = new BrowserWindow({ width: informationDataObj.width, height: informationDataObj.height, frame: frameBoolean });

                    newBrowser.on('closed', function () {
                        console.log('replaced window closed event receive');
                        mainProcess.removeWindow(newWindowName);
                        newBrowser = null;
                    });

                    newBrowser.loadURL(htmlFileUrl);
                    mainProcess.addWindow(newWindowName, newBrowser);
                } else {
                    console.log('nothing happened');
                    // 아무 일도 안한다.
                }
            }
        });

        ipcMain.on('closeWindow', function (event, windowNameToClose, callBackFunctionBeforeWindowClosed, callBackFunctionAfterWindowClosed) {
            console.log("windowNameToClose 실행", windowNameToClose);

            //일단 종료시킬 윈도우를 맵에서 가져오고
            var browser = mainWindowListMap.get(windowNameToClose);
            if (browser != null) {
                if (callBackFunctionBeforeWindowClosed !== null) {
                    callBackFunctionBeforeWindowClosed();
                }

                //윈도우 리스트 저장맵에서 삭제시켜준후
                mainProcess.removeWindow(windowNameToClose);

                //윈도우 종료.
                browser.close();

                if (callBackFunctionAfterWindowClosed !== null) {
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
    init: function init(store, windowListMap) {
        mainStoreObj = store;
        mainWindowListMap = windowListMap;
    },

    //////
    addWindow: function addWindow(key, windowObj) {
        mainWindowListMap.set(key, windowObj);
    },

    //////
    removeWindow: function removeWindow(key) {
        mainWindowListMap.delete(key);
    },

    changeData: function changData(dataName, newData) {
        //console.log('electron_flux - changeData excute', dataName, newData);
        mainStoreObj[dataName] = newData;
        mainWindowListMap.forEach(function (currentValue, key) {
            //console.log('electron_flux - changeData ForEach execute',  key, currentValue);
            currentValue.webContents.send('dataChanged', dataName);
        });
    }

};

var rendererProcess = {

    init: function init(rendererRemoteMain, rendererIpc) {
        console.log('render process init ', rendererRemoteMain, rendererIpc);

        main222 = rendererRemoteMain;
        ipcRenderer = rendererIpc;
        mainStoreObj = main222.getStore();
        mainWindowListMap = main222.getWindowListMap();
        ipcRenderer.on('dataChanged', this.DataChanged);
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
    var mainStoreObj = ipcRenderer.sendSync('getStore');

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

/***/ }),
/* 5 */
/* unknown exports provided */
/* all exports used */
/*!****************!*\
  !*** ./App.js ***!
  \****************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(/*! react */ 0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(/*! react-dom */ 1);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _MenuButton = __webpack_require__(/*! ./components/MenuButton */ 3);

var _MenuButton2 = _interopRequireDefault(_MenuButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//경로를 이런식으로 해줘야 일렉트론이 인식한다. 주의하자


_reactDom2.default.render(_react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_MenuButton2.default, null)
), document.getElementById('app')); /**
                                     * Created by kimdoeun on 2017. 3. 13..
                                     */

/***/ }),
/* 6 */
/* unknown exports provided */
/* all exports used */
/*!************************!*\
  !*** ./realm/realm.js ***!
  \************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by kimdoeun on 2017. 3. 16..
 */

//var Realm = require('./node_modules/realm/compiled/electron-v1.6_win32_x64/realm.node');
var Realm = __webpack_require__(/*! realm */ 8);

var CarSchema = {
    name: 'Car',
    properties: {
        make: 'string',
        model: 'string',
        miles: { type: 'int', default: 0 }
    }
};
var PersonSchema = {
    name: 'Person',
    properties: {
        name: 'string',
        birthday: 'date',
        cars: { type: 'list', objectType: 'Car' },
        picture: { type: 'data', optional: true } }
};

// Initialize a Realm with Car and Person models
var realm = new Realm({ schema: [CarSchema, PersonSchema] });

//exports.realm = realm;  왜 이건 안되지???
module.exports = realm;

/***/ }),
/* 7 */
/* unknown exports provided */
/* all exports used */
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 8 */
/* unknown exports provided */
/* all exports used */
/*!************************!*\
  !*** external "realm" ***!
  \************************/
/***/ (function(module, exports) {

module.exports = require("realm");

/***/ })
/******/ ]);