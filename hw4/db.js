const { MongoClient } = require('mongodb');

const URL = "mongodb://localhost:27017/formsdb";

let dbInstance = null;

module.exports = {
    connectToDb: async () => {
        try {
            const client = await MongoClient.connect(URL, {});
            console.log('Connected to MongoDB');
            dbInstance = client.db();
        } catch (err) {
            console.error('Failed to connect to MongoDB:', err);
            throw err;
        }
    },

    getDb: () => {
        if (!dbInstance) {
            console.error('MongoDB connection not established');
            throw new Error('MongoDB connection not established');
        }
        return dbInstance;
    }
};
