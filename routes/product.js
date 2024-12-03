const express = require('express');
const router = express.Router();

const {fetchAllDocumentsByQuery} = require('../core/mongodb');

router.get('/', async (
    req,
    res, next
) =>
{
    const query = req.query.name ? {name: { $regex: req.query.name, $options: 'i' }} : {};

    res.render('collection', {
        title: 'Internet Shop - Collection',
        products: await fetchAllDocumentsByQuery('products', query)
    });
});


router.get('/:id', async (
    req,
    res, next
) =>
{
    res.render('product-page', {
        title: 'Internet Shop - Product Page'
    });
});

module.exports = router;