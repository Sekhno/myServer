const express = require('express');
const router = express.Router();

const Product = require('../../models/product');
const {insertItem, deleteItem, fetchAllDocuments} = require('../../core/mongodb');
const COLLECTION_NAME = 'products';

// Create - Додати новий product
router.post('/', async (req, res) => {
    try {
        await insertItem('products', req.body)
        res.status(201).send({message: 'Product Added'});
    } catch (error) {
        res.status(400).send(error);
    }
});

// Read - Отримати всі фільми
router.get('/', async (req, res) => {
    try {
        const users = await fetchAllDocuments(COLLECTION_NAME);

        res.status(200).send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// Read - Отримати product за ID
router.get('/:id', async (req, res) => {
    try {
        const movie = await Product.findById(req.params.id);
        if (!movie) {
            return res.status(404).send({ error: 'Movie not found' });
        }
        res.status(200).send(movie);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update - Оновити product за ID
router.put('/:id', async (req, res) => {
    try {

        const movie = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!movie) {
            return res.status(404).send({ error: 'Movie not found' });
        }
        res.status(200).send(movie);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete - Видалити фільм за ID
router.delete('/:id', async (req, res) => {
    try {
        await deleteItem(COLLECTION_NAME, req.params.id)

        res.status(200).send({ message: 'product deleted' });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;