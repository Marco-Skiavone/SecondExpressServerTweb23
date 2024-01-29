const fs = require("fs");
const {Model} = require('mongoose')

class GeneralController {
    /**It generates the class instance and creates the input stream for the dataset. */
    constructor(name, model, datasetPath) {
        if (this.constructor === GeneralController) {
            throw new Error("Class is of abstract type and can't be instantiated");
        } else {
            this.name = name
            this.model = model
            this.datasetPath = datasetPath
            this.stream = null
        }
    }

    /** It runs a {@link Collection.findOne} to see if the model is empty. */
    async isEmpty() {
        const found = await this.model.findOne()
        return found === null
    }

    async loadDataset() {
        try {
            // Push the data into the model if it's empty
            if (await this.isEmpty()) {
                let jsonData = JSON.parse(fs.readFileSync(this.datasetPath, 'utf-8'))
                await this.model.insertMany(jsonData)
                console.log("Model", this.name, "loaded.")
            } else {
                console.log("Model", this.name, "wasn't empty.")
            }
        } catch (error) {
            console.error('Error loading data from JSON file:\n', error)
            throw error
        }
    }
}

module.exports = GeneralController
