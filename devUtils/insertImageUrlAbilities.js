var abilities = require('../app/json/abilities.json');
var fs = require('fs');
var _ = require('lodash');
var util = require('util');

for(var key in abilities.abilitydata) {
    if(abilities.abilitydata.hasOwnProperty(key)) {
        var abilityName = key;
        var path = "../assets/abilities/" + abilityName + "_lg.png";
        var extendedAbilities = _.extend(abilities.abilitydata[key], {"img": path});
        abilities.abilitydata[key] = extendedAbilities;
    }
}

fs.writeFile("../app/json/abilities.json", JSON.stringify(abilities, null, 2), function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("File overwritten successfully");
    }
});
