var abilities = require('../app/json/abilities.json');
var fs = require('fs');
var _ = require('lodash');
var util = require('util');

for(var key in abilities) {
    if(abilities.hasOwnProperty(key)) {
        var abilityName = key;
        if(!abilityName.includes("special_bonus")) {
            var path = "../assets/abilities/" + abilityName + "_lg.png";
            var extendedAbilities = _.extend(abilities[key], {"img": path});
            abilities[key] = extendedAbilities;
        }
    }
}

fs.writeFile("../app/json/abilities.json", JSON.stringify(abilities, null, 2), function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("File overwritten successfully");
    }
});
