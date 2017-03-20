/**
 * Created by kimdoeun on 2017. 3. 13..
 */

import React from 'react';
import ReactDOM from 'react-dom';
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
const realm = require('../realm/realm');
const electron_taskbar_badge = require('electron_taskbar_badge');

var badgeCount = 0;
var badgeDataURL;
electron_taskbar_badge.setRenderProcessObj(ipcRenderer);

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
        var cars = realm.objects('Car');
        //console.log(cars);
        //console.log(typeof cars);
        //console.log(realm.objects('Car')[0].make);

        for(var i = 0 ; i< cars.length ; i++){
            console.log(cars[i]);
        }
    }

    setBadge() {
        console.log("onBtnClick3, 뱃지 생성");
        //console.log(NativeImage);

        badgeCount++;

        var text = String(badgeCount);
        if (process.platform === "darwin") {
            //맥에선 이렇게 간편하게 할 수 있다.
            ipcRenderer.send('badge-message', "darwin", badgeCount);
        } else if (process.platform === "win32") {  //그러나 윈도우에선 canvas에 그림을 그리고 그데이터를 메인에 넘긴후, 메인에서 native이미지를 생성해서 뱃지 추가한다.
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

          console.log("canvas는 : " , canvas);
          badgeDataURL = canvas.toDataURL();
          console.log(badgeDataURL);
          ipcRenderer.send('badge-message', "win32", badgeDataURL);
        }

    }

    notification() { //javascript의 알림기능은 이정도가 한계다. 어디서 튀어나올지, 배경색은 뭘로할지 등의 설정이 안된다.
    var options = {
      body : "New message from Lenter",
      icon : "http://eztrackit.com/wp-content/uploads/2014/06/mail-256.png"
    }

    var notification = new Notification("Title", options);
    console.log(notification.image)
    }


    setBadgeByModule(){
        badgeCount++;
        electron_taskbar_badge.setBadgeRenderer(badgeCount);
    }



    render() {

        return (
            <div>
                <button onClick={this.onBtnClick}>데이터 추가</button>
                <button onClick={this.onBtnClick2}>데이터 로드</button>
                <button onClick={this.setBadge}>뱃지설정</button>
                <button onClick={this.notification}>Notification</button>
                <button onClick={this.setBadgeByModule}>모듈을 이용한 뱃지설정</button>
            </div>


        );

    }

}
