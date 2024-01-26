class GeneralController {
    constructor(model) {
        if (this.constructor === GeneralController) {
            throw new Error("Class is of abstract type and can't be instantiated");
        } else {
            this.model = model
        }
    }

    async isEmpty() {
        const found = await this.model.findOne({})
        return found === null
    }

    pushDataset(dataset) {
        const batchSize = 1000; // Adjust this value based on dataset size
        const batches = [];

        for (let i = 0; i < dataset.length; i += batchSize) {
            const batch = dataset.slice(i, i + batchSize);
            batches.push(batch);
        }

        const promises = [];

        for (const batch of batches) {
            promises.push(this.model.insertMany(batch));
        }

        return Promise.all(promises)
    }
}

module.exports = GeneralController
