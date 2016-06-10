var abilities = require('../app/json/abilities.json');
var fs = require('fs');
var request = require('request');

var buildAbilitiesArray = function() {
    var importedAbilities = abilities.abilitydata;
    //console.log(importedAbilities);
    var abilitiesArray = [];
    for(var key in importedAbilities) {
        if(importedAbilities.hasOwnProperty(key)) {
            abilitiesArray.push(key);
        }
    }
    return abilitiesArray;
}

var abilitiesArray = buildAbilitiesArray();

var download = function(uri, filename, callback) {
    request.head(uri, function(err, res, body){
            // console.log('content-type:', res.headers['content-type']);
            // console.log('content-length:', res.headers['content-length']);

            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

console.log('Downloading images for ' + abilitiesArray.length + ' abilities');
for(i = 0; i < abilitiesArray.length; i++) {
    console.log('Downloading image for ' + abilitiesArray[i]);
    var constructedFileName = abilitiesArray[i] + '_lg.png';
    var url = 'http://cdn.dota2.com/apps/dota2/images/abilities/' + constructedFileName;
    var path = '../app/assets/abilities/' + constructedFileName;
    download(url, path, function() {
        console.log('done');
    });
}
