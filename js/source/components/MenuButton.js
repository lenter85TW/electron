/**
 * Created by kimdoeun on 2017. 3. 13..
 */

import React from 'react';
import ReactDOM from 'react-dom';
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
const realm = require('../realm/realm');

export default class MenuButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    onBtnClick() {
        console.log("onBtnClick1, 데이터 추가");
        realm.write( () => {
            realm.create('Car', {make:'Honda', model:'Accord', drive: 'awd'});
        });

    }

    onBtnClick2() {
        console.log("onBtnClick2, 데이터 로드");
        console.log(realm.objects('Car'));

    }

    render() {

        return (
            <div>
                <button onClick={this.onBtnClick}>데이터 추가</button>
                <button onClick={this.onBtnClick2}>데이터 로드</button>

            </div>


        );

    }

}


