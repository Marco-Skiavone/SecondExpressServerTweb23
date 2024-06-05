const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My API',
        description: 'Main Express Server - Front-End'
    },
    host: 'localhost:3002'
};

const outputFile = './swagger/swagger-output.json';
swaggerAutogen(outputFile, ['app.js'], doc);
