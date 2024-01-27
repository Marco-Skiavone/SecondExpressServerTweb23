const fs = require("fs");
const {Model} = require('mongoose')

class GeneralController {
    constructor(name, model, datasetPath) {
        if (this.constructor === GeneralController) {
            throw new Error("Class is of abstract type and can't be instantiated");
        } else {
            this.name = name
            this.model = model
            this.stream = fs.createReadStream(datasetPath);
        }
    }

    async isEmpty() {
        const found = await this.model.findOne()
        return found === null
    }

    async uploadChunks(){
        this.stream.on('data', chunk => {
            const data = JSON.parse(chunk.toString('utf8'));
            this.model.insertOne(data);
        });

        this.stream.on('end', () => {
            console.log('Completed uploading', this.name, 'dataset');
        });

        this.stream.on('error', err => {
            console.error('Error uploading', this.name, 'dataset:', err);
        });
    }
}

module.exports = GeneralController
