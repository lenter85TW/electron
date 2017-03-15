/**
 * Created by kimdoeun on 2017. 3. 13..
 */

import React from 'react';
import ReactDOM from 'react-dom';
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
const remote = require('electron').remote;
const main = remote.require('./main.js');
var gitmoduletest = require('gitmoduletest');  //내가 만들어서 깃허브에 올린 모듈을 가지고 와보자.


export default class MenuButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    onBtnClick() {
        console.log("onBtnClick");
        console.log(ipcRenderer.sendSync('synchronous-message', 'ping'));
        ipcRenderer.on('pong', function (event, arg){
         console.log(arg);
         });

        gitmoduletest.lenterSum(10,20);
    }

    onBtnClickMulti() {
        console.log("onBtnClickMulti");
        ipcRenderer.send('asynchronous-message', {type:"객체다"});
        ipcRenderer.send('asynchronous-message', {type:"객체다"});

        console.log(gitmoduletest.sum);  //결과는 계속 0  이녀석이 0인 이유는 이 sum은 이미 0인 상태로 export 되었기 때문

        //새로 require 하면?
        var gitmoduletest2 = require('gitmoduletest');
        console.log(gitmoduletest2.sum);  //결과는 계속 0 위와 같은 이유

        //get함수를 쓰면
        console.log(gitmoduletest.getSum()); //결과는 30씩 증가!!

        console.log(gitmoduletest2.getSum()); //이녀석도 30씩 같이 증가한다. 즉 gitmoduletest나 gitmoduletest2나 사실 같은 녀석을 참고하고 있는 것이다. 즉 싱글톤 사용하는 것 같은 느낌

    }



    componentDidMount(){
        console.log(remote.getGlobal("doeun")); //처음 기본적으로 저장된 글로벌 객체의 doeun 프로퍼티 내용을 출력
        ipcRenderer.on('asynchronous-reply', (event, arg, arg2) => { //실험해보니 send할때는 매개변수 여러개 보낼 수 있는데, on으로 받을때는 매개변수 하나밖에 못받네.
            console.log("asynchronous-reply 수신")
            console.log(arg, arg2);
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


