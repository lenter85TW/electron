'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by kimdoeun on 2017. 3. 13..
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var electron = require('electron');
var ipcRenderer = electron.ipcRenderer;
var remote = require('electron').remote;
var main = remote.require('./main.js');

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
            console.log("onBtnClick");
            console.log(ipcRenderer.sendSync('synchronous-message', 'ping'));
            /*ipcRenderer.on('pong', function (event, arg){
             console.log(arg);
             });*/
        }
    }, {
        key: 'onBtnClickMulti',
        value: function onBtnClickMulti() {
            console.log("onBtnClickMulti");
            ipcRenderer.send('asynchronous-message', { type: "객체다" });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            console.log(remote.getGlobal("doeun"));
            ipcRenderer.on('asynchronous-reply', function (event, arg) {
                console.log("asynchronous-reply 수신");
                console.log(arg);
                console.log(remote.getGlobal("doeun"));
            });
        }
    }, {
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { onClick: this.onBtnClick },
                    '\uBC84\uD2BC\uC774\uB2E4'
                ),
                _react2.default.createElement(
                    'div',
                    { onClick: this.onBtnClickMulti },
                    '\uBA40\uD2F0\uD1B5\uC2E0 \uD14C\uC2A4\uD2B8'
                )
            );
        }
    }]);

    return MenuButton;
}(_react2.default.Component);

exports.default = MenuButton;