/**
 * Created by kimdoeun on 2017. 3. 16..
 */


var Realm = require('realm');


var CarSchema = {
    name: 'Car',
    properties: {
        make:  'string',
        model: 'string',
        miles: {type: 'int', default: 0},
    }
};
var PersonSchema = {
    name: 'Person',
    properties: {
        name:     'string',
        birthday: 'date',
        cars:     {type: 'list', objectType: 'Car'},
        picture:  {type: 'data', optional: true}, // optional property
    }
};

// Initialize a Realm with Car and Person models
var realm = new Realm({schema: [CarSchema, PersonSchema]});

//exports.realm = realm;  왜 이건 안되지???
module.exports = realm;

