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
            this.state = {

            }
        }

        onBtnClick() {
            console.log("onBtnClick");
            console.log(ipcRenderer.sendSync('synchronous-message', 'ping'));
            /*ipcRenderer.on('pong', function (event, arg){
               console.log(arg);
            });*/
        }

        render() {

            return (
                <div onClick={this.onBtnClick}>
                    버튼이다
                </div>
            );

        }

}


