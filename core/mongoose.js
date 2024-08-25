const mongoose = require('mongoose');

const USERNAME = 'TestUserName';
const PASSWORD = '*7WkKqhrpvEB@kQ';
const DATABASE = 'sample_mflix';
const URL = 'mongodb://atlas-sql-66a5f40ce18148343b947a13-bafao.a.query.mongodb.net/sample_mflix?ssl=true&authSource=admin'


mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: USERNAME,
    pass: PASSWORD,
    dbName: DATABASE
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

module.exports = mongoose;