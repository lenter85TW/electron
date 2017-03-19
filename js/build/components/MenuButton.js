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
var realm = require('../realm/realm');

var badgeCount = 0;
var badgeDataURL;

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
            var cars = realm.objects('Car');
            //console.log(cars);
            //console.log(typeof cars);
            //console.log(realm.objects('Car')[0].make);

            for (var i = 0; i < cars.length; i++) {
                console.log(cars[i]);
            }
        }
    }, {
        key: 'setBadge',
        value: function setBadge() {
            console.log("onBtnClick3, 뱃지 생성");
            //console.log(NativeImage);

            badgeCount++;

            var text = String(badgeCount);
            if (process.platform === "darwin") {
                //맥에선 이렇게 간편하게 할 수 있다.
                ipcRenderer.send('badge-message', "darwin", badgeCount);
            } else if (process.platform === "win32") {
                //그러나 윈도우에선 canvas에 그림을 그리고 그데이터를 메인에 넘긴후, 메인에서 native이미지를 생성해서 뱃지 추가한다.
                console.log("wind32임");

                if (text === "") {
                    win.setOverlayIcon(null, "");
                    return;
                }

                // Create badge
                var canvas = document.createElement("canvas");
                canvas.height = 140;
                canvas.width = 140;
                var ctx = canvas.getContext("2d");
                ctx.fillStyle = "red";
                ctx.beginPath();
                ctx.ellipse(70, 70, 70, 70, 0, 0, 2 * Math.PI);
                ctx.fill();
                ctx.textAlign = "center";
                ctx.fillStyle = "white";

                if (text.length > 2) {
                    ctx.font = "75px sans-serif";
                    ctx.fillText("" + text, 70, 98);
                } else if (text.length > 1) {
                    ctx.font = "100px sans-serif";
                    ctx.fillText("" + text, 70, 105);
                } else {
                    ctx.font = "125px sans-serif";
                    ctx.fillText("" + text, 70, 112);
                }

                console.log("canvas는 : ", canvas);
                badgeDataURL = canvas.toDataURL();
                console.log(badgeDataURL);
                ipcRenderer.send('badge-message', "win32", badgeDataURL);
            }
        }
    }, {
        key: 'notification',
        value: function notification() {
            //javascript의 알림기능은 이정도가 한계다. 어디서 튀어나올지, 배경색은 뭘로할지 등의 설정이 안된다.
            var options = {
                body: "New message from Lenter",
                icon: "http://eztrackit.com/wp-content/uploads/2014/06/mail-256.png"
            };

            var notification = new Notification("Title", options);
            console.log(notification.image);
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
                ),
                _react2.default.createElement(
                    'button',
                    { onClick: this.setBadge },
                    '\uBC43\uC9C0\uC124\uC815'
                ),
                _react2.default.createElement(
                    'button',
                    { onClick: this.notification },
                    'Notification'
                )
            );
        }
    }]);

    return MenuButton;
}(_react2.default.Component);

exports.default = MenuButton;