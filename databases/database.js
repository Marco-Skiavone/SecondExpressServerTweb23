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

/*
const disconnectAndDropDatabase = async () => {
    try {
        // Drop the database
        await mongoose.connection.db.dropDatabase();
        console.log('Database dropped successfully');
    } catch (error) {
        console.error('Error dropping database:', error);
        process.exit(1);
    } finally {
        // Close the MongoDB connection
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
        process.exit(0);
    }
};

// Listen for process termination events
process.on('exit', disconnectAndDropDatabase);
process.on('SIGINT', disconnectAndDropDatabase); // Handles Ctrl+C
process.on('SIGTERM', disconnectAndDropDatabase); // Handles termination signals

 */
