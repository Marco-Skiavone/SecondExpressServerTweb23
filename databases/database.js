const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/football';

mongoose.Promise = global.Promise;

connection = mongoose.connect(mongoDB, {
    checkServerIdentity: false,
    family: 4
})
    .then(() => {
        console.log('Connection to mongodb worked!');
    })
    .catch(err => {
        console.log('Connection to mongodb did not work! ' + JSON.stringify(err));
    });
