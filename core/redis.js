const { createClient } = require('redis');

const PASSWORD = 'NDELIyGqP0EZuLkBxc5pHk4tTLgIe822';
const HOST = 'redis-16248.c327.europe-west1-2.gce.redns.redis-cloud.com';
const PORT = 16248;

const client = createClient({
    password: PASSWORD,
    socket: {
        host: HOST,
        port: PORT
    }
});

client.on('error', err => console.log('Redis Client Error', err));

(async () => {
    await client.connect();
})();

const storeSimpleString = async function(key, value) {
    await client.set(key, value);
}

const retrieveSimpleString = async function(key) {
    return await client.get(key);
}

const storeMap = async function(key, map) {
    return await client.hSet(key, map)
}

const retrieveMap = async function(key) {
    return  await client.hGetAll(key);
}

module.exports = {
    storeSimpleString,
    retrieveSimpleString,
    storeMap,
    retrieveMap
};