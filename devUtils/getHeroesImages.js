var heroes = require('../app/json/heroes.json');
var fs = require('fs');
var request = require('request');

var buildHeroesArray = function() {
    var importedHeroes = heroes.result.heroes;
    console.log(importedHeroes);
    var heroesArray = [];
    for(i = 0; i < importedHeroes.length; i++) {
        var editedName = importedHeroes[i].name.replace("npc_dota_hero_", "");
        heroesArray.push(editedName);
    }
    return heroesArray;
}

var heroesArray = buildHeroesArray();

var download = function(uri, filename, callback) {
    request.head(uri, function(err, res, body){
            // console.log('content-type:', res.headers['content-type']);
            // console.log('content-length:', res.headers['content-length']);

            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

console.log('Downloading images for ' + heroesArray.length + ' heroes');
for(i = 0; i < heroesArray.length; i++) {
    console.log('Downloading image for ' + heroesArray[i]);
    var constructedFileName = heroesArray[i] + '_full.png';
    var url = 'http://cdn.dota2.com/apps/dota2/images/heroes/' + constructedFileName;
    var path = '../app/assets/heroes/' + constructedFileName;
    download(url, path, function() {
        console.log('done');
    });
}
