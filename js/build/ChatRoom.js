'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _MenuButton = require('../js/build/components/MenuButton');

var _MenuButton2 = _interopRequireDefault(_MenuButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//경로를 이런식으로 해줘야 일렉트론이 인식한다. 주의하자


_reactDom2.default.render(_react2.default.createElement(
    'div',
    null,
    '\uCC44\uD305\uD654\uBA741',
    _react2.default.createElement(_MenuButton2.default, null)
), document.getElementById('chatRoom')); /**
                                          * Created by kimdoeun on 2017. 3. 13..
                                          */