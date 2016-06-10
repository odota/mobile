var items = require('../app/json/items.json');
var fs = require('fs');
var request = require('request');

var buildItemsArray = function() {
    var importedItems = items.itemdata;
    //console.log(importedAbilities);
    var itemsArray = [];
    for(var key in importedItems) {
        if(importedItems.hasOwnProperty(key)) {
            itemsArray.push(key);
        }
    }
    return itemsArray;
}

var itemsArray = buildItemsArray();

var download = function(uri, filename, callback) {
    request.head(uri, function(err, res, body){
            // console.log('content-type:', res.headers['content-type']);
            // console.log('content-length:', res.headers['content-length']);

            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

console.log('Downloading images for ' + itemsArray.length + ' items');
for(i = 0; i < itemsArray.length; i++) {
    console.log('Downloading image for ' + itemsArray[i]);
    var constructedFileName = itemsArray[i] + '_lg.png';
    var url = 'http://cdn.dota2.com/apps/dota2/images/items/' + constructedFileName;
    var path = '../app/assets/items/' + constructedFileName;
    download(url, path, function() {
        console.log('done');
    });
}
