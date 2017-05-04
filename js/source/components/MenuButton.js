/**
 * Created by kimdoeun on 2017. 3. 13..
 */

import React from 'react';
import ReactDOM from 'react-dom';
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
const realm = require('../realm/realm');
const remote = require('electron').remote;
const main = remote.require('./main.js'); //경로 주의.
import electron_flux from '../../../electron_flux';





export default class MenuButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        console.log('MenuButton remote : ', remote)
        console.log('MenuButton main : ', main);
        // var store = ipcRenderer.sendSync('getstore');
        // console.log(store);
        electron_flux.rendererProcess.init(ipcRenderer, remote);

        console.log(electron_flux.getMainStoreObj());
        console.log(  (electron_flux.getMainWindowListMap())());

        //electron_flux.rendererAction.updateStore('test', 'test2');

        console.log(electron_flux.getMainStoreObj());
        console.log(  (electron_flux.getMainWindowListMap())());

        //electron_flux.rendererAction.updateStore('test', 'test3');

        console.log(electron_flux.getMainStoreObj());
        console.log(  (electron_flux.getMainWindowListMap())());


        // setTimeout( () => {
        //     console.log(electron_flux.getMainStoreObj().test);
        // }, 1000)

        // console.log(remote.getGlobal('store') );
        // remote.getGlobal('store').method();



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


