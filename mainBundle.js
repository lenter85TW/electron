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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/* unknown exports provided */
/* all exports used */
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 1 */
/* unknown exports provided */
/* all exports used */
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),
/* 2 */
/* unknown exports provided */
/* all exports used */
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 3 */
/* unknown exports provided */
/* all exports used */
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 4 */
/* unknown exports provided */
/* all exports used */
/*!*******************************!*\
  !*** C:/electronTest/main.js ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by kimdoeun on 2017. 3. 13..
 */

var electron = __webpack_require__(/*! electron */ 1);
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var sys = __webpack_require__(/*! util */ 3);
var path = __webpack_require__(/*! path */ 2);
var spawn = __webpack_require__(/*! child_process */ 0).spawnSync;
var ipcMain = electron.ipcMain;

var mainWindow = void 0;
var chatRoomWindow = void 0;
var chatRoomWindow2 = void 0;

app.on('ready', function () {
    mainWindow = new BrowserWindow({ width: 800, height: 600, icon: __dirname + '/logo.ico' }); //여기서 icon은 앱을 실행했을때 왼쪽 상단에 뜨는 아이콘
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.webContents.openDevTools();

    if (handleStartupEvent()) {
        return;
    }
});

ipcMain.on('synchronous-message', function (event, arg) {});

//처음에 앱이 시작되고 'ready'가 되었을 때 이 함수를 실행한다. squirrel이벤트라는 걸 통해 switch-case문을 시작한다.
//처음 install이되거나 update가 되었을때 update.exe를 실행하며 옵션으로 createshortcut도 실해한다. uninstall이벤트는 그 반대 작업.
var handleStartupEvent = function handleStartupEvent() {
    if (process.platform !== 'win32') {
        return false;
    }

    var exe = process.execPath;
    var updater = path.resolve(path.dirname(exe), '..', 'Update.exe');
    var squirrelCommand = process.argv[1];

    switch (squirrelCommand) {
        case '--squirrel-install':
        case '--squirrel-updated':
            sys.log('Creating shortcuts--2');
            spawn(updater, ['--createShortcut', exe]);
            app.quit();
            return true;
        case '--squirrel-uninstall':
            sys.log('Removing shortcuts');
            spawn(updater, ['--removeShortcut', exe]);
            app.quit();
            return true;
        case '--squirrel-obsolete':
            sys.log('Getting a makeover');
            app.quit();
            return true;
    }
};

/***/ })
/******/ ]);