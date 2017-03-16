/**
 * Created by kimdoeun on 2017. 3. 13..
 */

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const url = require('url');
const path = require('path');
const ipcMain = electron.ipcMain;

let mainWindow;
let chatRoomWindow;
let chatRoomWindow2;


app.on('ready', () => {
    mainWindow = new BrowserWindow( {width: 800, height: 600});
    mainWindow.loadURL ('file://' + __dirname + '/index.html');
    mainWindow.webContents.openDevTools();


})




ipcMain.on('synchronous-message', function (event, arg) {


});


// var Realm = require('./node_modules/realm/compiled/node-v47_darwin_x64/realm');
/*var Realm = require('realm');

const CarSchema = {
    name: 'Car',
    properties: {
        make:  'string',
        model: 'string',
        miles: {type: 'int', default: 0},
    }
};
const PersonSchema = {
    name: 'Person',
    properties: {
        name:     'string',
        birthday: 'date',
        cars:     {type: 'list', objectType: 'Car'},
        picture:  {type: 'data', optional: true}, // optional property
    }
};

// Initialize a Realm with Car and Person models
let realm = new Realm({schema: [CarSchema, PersonSchema]});

exports.realm = realm;*/
