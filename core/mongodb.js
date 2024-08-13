const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const dbName = 'myProject';

const insertItem = async (name, description, image) => {

    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection('items');
        const doc = {
            name: name,
            description: description,
            image: image
        };
        const result = await collection.insertOne(doc);
        console.log('Inserted document with ID:', result.insertedId);
    } catch (err) {
        console.error('Error inserting data:', err);
    } finally {
        await client.close();
    }
};

const fetchAllDocuments = async () => {
    try {
        await client.connect();
        console.log('Connected successfully to server');
        const database = client.db(dbName);
        const collection = database.collection('items');

        // Отримання всіх документів
        const documents = await collection.find({}).toArray();
        console.log('All documents:', documents);
    } catch (err) {
        console.error('Error fetching data:', err);
    } finally {
        await client.close();
    }
};



module.exports = {insertItem, fetchAllDocuments};