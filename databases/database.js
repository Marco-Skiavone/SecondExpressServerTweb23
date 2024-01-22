const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/football';

mongoose.Promise = global.Promise;

connection = mongoose.connect(mongoDB, {
    checkServerIdentity: false,
    family: 4
})
    .then(() => {
        console.log('connection to mongodb worked!');
    })
    .catch(err => {
        console.log('connection to mongodb did not work!' + JSON.stringify(err));
    });
