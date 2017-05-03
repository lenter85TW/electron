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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by kimdoeun on 2017. 3. 13..
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var electron = __webpack_require__(/*! electron */ 5);
var ipcRenderer = electron.ipcRenderer;
var realm = __webpack_require__(/*! ../realm/realm */ 4);

var MenuButton = function (_React$Component) {
    _inherits(MenuButton, _React$Component);

    function MenuButton(props) {
        _classCallCheck(this, MenuButton);

        var _this = _possibleConstructorReturn(this, (MenuButton.__proto__ || Object.getPrototypeOf(MenuButton)).call(this, props));

        _this.state = {};
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
/* 3 */
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

var _MenuButton = __webpack_require__(/*! ./components/MenuButton */ 2);

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
/* 4 */
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
var Realm = __webpack_require__(/*! realm */ 6);

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
/* 5 */
/* unknown exports provided */
/* all exports used */
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),
/* 6 */
/* unknown exports provided */
/* all exports used */
/*!************************!*\
  !*** external "realm" ***!
  \************************/
/***/ (function(module, exports) {

module.exports = require("realm");

/***/ })
/******/ ]);