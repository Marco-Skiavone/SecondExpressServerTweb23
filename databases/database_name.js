const mongoose = require('mongoose');

//The URL which will be queried. Run "mongod.exe" for this to connect
//var url = 'mongodb://localhost:27017/test';
const mongoDB = 'mongodb://localhost:27017/database_name';
mongoose.Promise = global.Promise;
connection = mongoose.connect(mongoDB, {
    // useNewUrlParser: true, should be unnecessary nowadays
    // useUnifiedTopology: true, should be unnecessary nowadays
    checkServerIdentity: false,
})
    .then(() => {
        console.log('connection to mongodb worked!');
    })
    .catch(err => {
        console.log('connection to mongodb did not work! ' + JSON.stringify(err));
    })
