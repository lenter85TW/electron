/**
 * Created by kimdoeun on 2017. 3. 16..
 */

'use strict';

var Realm = require('realm');

var realm = new Realm({
    schema: [{name: 'Dog', properties: {name: 'string'}}]
});

realm.write(() => {
    realm.create('Dog', {name: 'Rex'});
});

console.log(realm.objects('Dog'));
console.log(process.versions.v8);