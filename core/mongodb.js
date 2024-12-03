const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const USERNAME = 'TestUserName';
const PASSWORD = '*7WkKqhrpvEB%40kQ';
const DATABASE = 'sample_mflix';
const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.yowhpdm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run()
{
    try {
        console.log('Connecting to MongoDB...');
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    catch(err) {
        console.log(err);
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);

const dbName = DATABASE;

const insertItem = async (colName, item) =>
{
    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(colName);
        const result = await collection.insertOne(item);
        console.log('Inserted document with ID:', result.insertedId);
    } catch (err) {
        console.error('Error inserting data:', err);
    } finally {
        await client.close();
    }
};

const updateItem = async (colName, filter, update) =>
{
    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(colName);
        await collection.updateOne(filter,
            { $set: update }
        );
    } catch (e) {
        await client.close();
    }
}

const deleteItem = async (colName, itemId) =>
{
    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(colName);

        const result = await collection.deleteOne({ _id: new ObjectId(itemId) });

        if (result.deletedCount === 1) {
            console.log('Successfully deleted document');
        } else {
            console.log('No documents matched the query. Document not deleted');
        }
    } catch (err) {
        console.error('Error deleting data:', err);
    } finally {
        await client.close();
    }
};

const fetchAllDocuments = async (name) =>
{
    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(name);

        return await collection.find({}).toArray();
    } catch (err) {
        console.error('Error fetching data:', err);
    } finally {
        await client.close();
    }
};

const fetchAllDocumentsByQuery = async (name, query) =>
{
    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(name);

        return await collection.find(query).toArray();
    } catch (err) {
        console.error('Error fetching data:', err);
    } finally {
        await client.close();
    }
};

const fetchCollectionByIds = async function (name, productIds)
{
    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(name);
        const objectIds = productIds.map(id => new ObjectId(id));

        return await collection.find({ _id: { $in: objectIds } }).toArray();
    } finally {
        await client.close();
    }
}

const findByQuery = async (colName, query) =>
{
    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(colName);

        return await collection.findOne(query);
    } catch (err) {
        console.error('Error finding data:', err);
    } finally {
        await client.close();
    }
}

const fetchTopRatedProducts = async (colName, sort, limit) =>
{
    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(colName);
        return await collection
            .find()
            .sort({ rating: sort })
            .limit(limit)
            .toArray();

    } finally {
        await client.close();
    }
}

const fetchProductsByTag = async (colName, sort, limit, tag) =>
{
    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(colName);
        return await collection
            .find({tags: tag})
            .sort({ rating: sort })
            .limit(limit)
            .toArray();

    } finally {
        await client.close();
    }
}

const updateUserWishlist = async (email, wishlistIds) =>
{
    try {
        await client.connect();
        const database = client.db(dbName);
        const users = database.collection('users');
        const result = await users.updateOne(
            { email }, // Знайти користувача за email
            { $set: { wishlist: wishlistIds.map(id => new ObjectId(id)) } }, // Додати/оновити поле wishlist
            { upsert: true } // Створити новий документ, якщо він не існує
        );

        console.log('Updated User:', result);
    } catch (err) {
        console.error('Error updating user wishlist:', err);
    } finally {
        await client.close();
    }
}

const getUserWishlist = async (email) =>
{
    try {
        await client.connect();
        const database = client.db(dbName);
        const users = database.collection('users');

        // Знайти користувача та повернути тільки поле wishlist
        const user = await users.findOne(
            { email }, // Знайти користувача за email
            { projection: { wishlist: 1, _id: 0 } } // Повернути лише wishlist
        );

        if (!user) {
            console.log('User not found');
            return null;
        }

        return user.wishlist;
    } catch (err) {
        console.error('Error retrieving wishlist:', err);
    } finally {
        await client.close();
    }
}

module.exports = {
    insertItem,
    deleteItem,
    updateItem,
    fetchAllDocuments,
    fetchAllDocumentsByQuery,
    fetchCollectionByIds,
    findByQuery,
    fetchTopRatedProducts,
    fetchProductsByTag,
    updateUserWishlist
};