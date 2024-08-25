const express = require('express');
const router = express.Router();
const {createItem, readItems, updateItem, deleteItem} = require('../core/crud');


/* GET home page. */
router.get('/', async (req, res, next) => {
    res.render('product-page', { title: 'Internet Shop' });
});

module.exports = router;