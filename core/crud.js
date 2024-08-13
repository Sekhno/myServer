const db = require('./database');

const createItem = (name, description, image, callback) => {
    const sql = `INSERT INTO items (name, description, image) VALUES (?, ?, ?)`;

    db.run(sql, [name, description, image], function(err){
        callback(err, this.lastID);
    });
}

const readItems = (callback) => {
    const sql = `SELECT * FROM items`;

    db.all(sql, [], callback)
}

const updateItem = (id, name, description, image, callback) => {
    const sql = `UPDATE items SET name = ?, description = ? WHERE id = ?`;

    db.run(sql, [id, name, description, image], callback)
}

const deleteItem = (id, callback) => {
    const sql = `DELETE FROM items WHERE id = ?`;

    db.run(sql, [id], callback)
}

module.exports = {createItem, readItems, updateItem, deleteItem}