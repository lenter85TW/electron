/**
 * Created by kimdoeun on 2017. 3. 13..
 */

import React from 'react';
import ReactDOM from 'react-dom';
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
const remote = require('electron').remote;
const main = remote.require('./main.js');


export default class MenuButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    onBtnClick() {
        console.log("onBtnClick");
        console.log(ipcRenderer.sendSync('synchronous-message', 'ping'));
        /*ipcRenderer.on('pong', function (event, arg){
         console.log(arg);
         });*/
    }

    onBtnClickMulti() {
        console.log("onBtnClickMulti");
        ipcRenderer.send('asynchronous-message', {type:"객체다"});

    }

    componentDidMount(){
        console.log(remote.getGlobal("doeun")); //처음 기본적으로 저장된 글로벌 객체의 doeun 프로퍼티 내용을 출력
        ipcRenderer.on('asynchronous-reply', (event, arg) => {
            console.log("asynchronous-reply 수신")
            console.log(arg);
            console.log(remote.getGlobal("doeun"));  //이벤트가 발생해서 갱신된 글로벌 객체의 doeun 프로퍼티 내용 출력
        });
    }

    render() {

        return (
            <div>
                <div onClick={this.onBtnClick}>
                    버튼이다
                </div>

                <div onClick={this.onBtnClickMulti}>
                    멀티통신 테스트
                </div>
            </div>

        );

    }

}


