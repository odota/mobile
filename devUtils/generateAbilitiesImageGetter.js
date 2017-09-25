const abilities = require('Json/ability_ids.json')
const fs = require('fs')

let data = 'export function getAbilityImage(id) {\n\tvar staticImage;\n'

Object.keys(abilities).forEach(key => {
    if (abilities[key].includes('special_bonus')) {
        const newLine = '\t} else if (id == " + key + ") {\n\t\tstaticImage = require("../assets/talent_tree.png");\n'
        data += newLine
    } else {
        const newLine = '\t} else if (id == " + key + ") {\n\t\tstaticImage = require("../assets/abilities/" + abilities[key] + "_lg.png");\n'
        data += newLine
    }
})

data += '\t}\n\t return staticImage;\n}'

fs.writeFile('../app/utils/getAbilityImage.js', data, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('File overwritten successfully')
    }
})
