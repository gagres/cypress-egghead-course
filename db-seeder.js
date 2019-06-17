const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const fs = require('fs');

module.exports = {
    seed: (state) => {
        // let adapter = new FileSync('db.json');
        // let db = low(adapter);
        // db.setState(state);
        fs.writeFile('db.test.json', JSON.stringify(state), 'utf8', (err, success) => {
            if (err) {
                console.log(err);
            } else {
                console.log(success);
            }
        });
    }
}