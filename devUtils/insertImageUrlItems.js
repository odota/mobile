var items = require('../app/json/items.json');
var fs = require('fs');
var _ = require('lodash');
var util = require('util');

for(var key in items.itemdata) {
    if(items.itemdata.hasOwnProperty(key)) {
        var itemName = key;
        var path = "../assets/items/" + itemName + "_lg.png";
        var extendedItems = _.extend(items.itemdata[key], {"img": path});
        items.itemdata[key] = extendedItems
    }
}

//console.log(util.inspect(items, {showHidden: false, depth: null}));

fs.writeFile('../app/json/items.json', JSON.stringify(items, null, 2), function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("File overwritten successfully");
    }
});
