/**
 * Created by kimdoeun on 2017. 3. 13..
 */

import React from 'react';
import ReactDOM from 'react-dom';
import MenuButton from './components/MenuButton'; //경로를 이런식으로 해줘야 일렉트론이 인식한다. 주의하자


ReactDOM.render(
    <div>
        <MenuButton/>
    </div>,
    document.getElementById('app')
);