class GeneralController {
    constructor(model) {
        if (this.constructor !== GeneralController) {
            this.model = model
        }
        throw new Error("Class is of abstract type and can't be instantiated");
    }

    isEmpty() {
        return Boolean(this.model.findOne())
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
