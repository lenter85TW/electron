/**
 * Created by kimdoeun on 2017. 3. 13..
 */

import React from 'react';
import ReactDOM from 'react-dom';
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;


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
        ipcRenderer.on('asynchronous-reply', (event, arg) => {
            console.log("asynchronous-reply 수신")
            console.log(arg);
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


