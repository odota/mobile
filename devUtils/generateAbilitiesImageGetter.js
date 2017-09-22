var abilities = require('../app/json/ability_ids.json');
var fs = require('fs');
var _ = require('lodash');

var data = "export function getAbilityImage(id) {\n\tvar staticImage;\n";

for(var key in abilities) {
    if(abilities.hasOwnProperty(key)) {
        if(abilities[key].includes("special_bonus")) {
            var newLine = "\t} else if (id == " + key + ") {\n\t\tstaticImage = require('../assets/talent_tree.png')};\n"
            data += newLine;
        } else {
            var newLine = "\t} else if (id == " + key + ") {\n\t\tstaticImage = require('../assets/abilities/" + abilities[key] + "_lg.png')};\n"
            data += newLine;
        }
    }
}

data += "\t}\n\t return staticImage;\n}"

fs.writeFile("../app/utils/getAbilityImage.js", data, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("File overwritten successfully");
    }
});
