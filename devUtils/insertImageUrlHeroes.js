var heroes = require('../app/json/heroes.json');
var fs = require('fs');
var _ = require('lodash');
var util = require('util');

for(i = 0; i < heroes.result.heroes.length; i++) {
    var heroName = heroes.result.heroes[i].name.replace("npc_dota_hero_", "");
    var path = "../assets/heroes/" + heroName + "_full.png";
    var extendedHeroes = _.extend(heroes.result.heroes[i], {"img": path});
    heroes.result.heroes[i] = extendedHeroes;

}

fs.writeFile("../app/json/heroes.json", JSON.stringify(heroes, null, 2), function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("File overwritten successfully");
    }
});
//console.log(util.inspect(heroes, {showHidden: false, depth: null}));
