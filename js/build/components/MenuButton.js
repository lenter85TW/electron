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
var gitmoduletest = require('gitmoduletest'); //내가 만들어서 깃허브에 올린 모듈을 가지고 와보자.


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
            ipcRenderer.on('pong', function (event, arg) {
                console.log(arg);
            });

            gitmoduletest.lenterSum(10, 20);
        }
    }, {
        key: 'onBtnClickMulti',
        value: function onBtnClickMulti() {
            console.log("onBtnClickMulti");
            ipcRenderer.send('asynchronous-message', { type: "객체다" });
            ipcRenderer.send('asynchronous-message', { type: "객체다" });

            console.log(gitmoduletest.sum); //결과는 계속 0  이녀석이 0인 이유는 이 sum은 이미 0인 상태로 export 되었기 때문

            //새로 require 하면?
            var gitmoduletest2 = require('gitmoduletest');
            console.log(gitmoduletest2.sum); //결과는 계속 0 위와 같은 이유

            //get함수를 쓰면
            console.log(gitmoduletest.getSum()); //결과는 30씩 증가!!

            console.log(gitmoduletest2.getSum()); //이녀석도 30씩 같이 증가한다. 즉 gitmoduletest나 gitmoduletest2나 사실 같은 녀석을 참고하고 있는 것이다. 즉 싱글톤 사용하는 것 같은 느낌
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            console.log(remote.getGlobal("doeun")); //처음 기본적으로 저장된 글로벌 객체의 doeun 프로퍼티 내용을 출력
            ipcRenderer.on('asynchronous-reply', function (event, arg, arg2) {
                //실험해보니 send할때는 매개변수 여러개 보낼 수 있는데, on으로 받을때는 매개변수 하나밖에 못받네.
                console.log("asynchronous-reply 수신");
                console.log(arg, arg2);
                console.log(remote.getGlobal("doeun")); //이벤트가 발생해서 갱신된 글로벌 객체의 doeun 프로퍼티 내용 출력
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