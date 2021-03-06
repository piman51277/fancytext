const readlineSync = require('readline-sync');
const dict = require('./dict.json')

while (true) {
    const char = readlineSync.question("char:");
    const value = readlineSync.question("value:")
    if (char == "break") {
        break;
    }
    dict[char] = value;
}

const fs = require('fs')
fs.writeFileSync('./dict.json', JSON.stringify(dict))