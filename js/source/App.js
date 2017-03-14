/**
 * Created by kimdoeun on 2017. 3. 13..
 */

import React from 'react';
import ReactDOM from 'react-dom';
import MenuButton from './js/build/components/MenuButton'; //경로를 이런식으로 해줘야 일렉트론이 인식한다. 주의하자
import MenuButton2 from './js/build/components/MenuButton2';

ReactDOM.render(
    <div>
        첫화면
        <MenuButton/>
        <MenuButton2/>
    </div>,
    document.getElementById('app')
);