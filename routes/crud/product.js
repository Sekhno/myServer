const express = require('express');
const router = express.Router();


const {storeSimpleString, retrieveSimpleString, storeMap, retrieveMap} = require('../../core/redis');

const Product = require('../../models/product');
const {insertItem, deleteItem, fetchAllDocuments, fetchProductsByIds} = require('../../core/mongodb');
const COLLECTION_NAME = 'products';

const parseCookieString = (cookieString) => {
    return cookieString.split('&').reduce((acc, pair) => {
        const [key, value] = pair.split('='); // Розділяємо ключ і значення
        acc[key] = value; // Додаємо в об'єкт
        return acc;
    }, {});
};

// GET Отримати корзину
router.get('/cart', async (
    req,
    res
) =>
{
    console.log('GET CART')
    try {
        const visitor = req.cookies['NextVisitor'];
        const {LatestSessionID, ID} = parseCookieString(visitor);

        console.log('LatestSessionID', LatestSessionID);
        console.log('ID', ID);

        const cart = JSON.parse(await retrieveSimpleString(LatestSessionID)) || [];
        const ids = cart.map(item => item.productId);
        const products = await fetchProductsByIds('products', ids);

        // cart.forEach(item => {
        //     item.product = products.find(item => item._id === item.productId);
        // })

        res.status(200).json({cart, products});
    } catch (e) {
        console.error(e)
    }
});

// POST Додати товар до корзини
router.post('/cart', async (
    req,
    res
) => {
    const visitor = req.cookies['NextVisitor'];
    const {LatestSessionID, ID} = parseCookieString(visitor);

    const cart = JSON.parse(await retrieveSimpleString(LatestSessionID)) || [];
    const id = req.body.id;
    const existingProduct = cart.find((item) => item.productId === id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ productId: id, quantity: 1 });
    }

    await storeSimpleString(LatestSessionID, JSON.stringify(cart));

    res.status(200).json(cart);
});

// DELETE видалити товар
router.delete('/cart', async (
    req,
    res
) =>
{
    const visitor = req.cookies['NextVisitor'];
    const {LatestSessionID, ID} = parseCookieString(visitor);

    const cart = JSON.parse(await retrieveSimpleString(LatestSessionID)) || [];
    const id = req.body.id;
    const existingProduct = cart.find((item) => item.productId === id);

    if (existingProduct) {
        cart.splice(cart.indexOf(existingProduct), 1);
    }

    await storeSimpleString(LatestSessionID, JSON.stringify(cart));

    res.status(200).json({});
})

// Create - Додати новий product
router.post('/', async (
    req,
    res
) =>
{
    try {
        await insertItem('products', req.body)
        res.status(201).send({message: 'Product Added'});
    } catch (error) {
        res.status(400).send(error);
    }
});

// Read - Отримати всі products
router.get('/', async (
    req,
    res
) =>
{
    try {
        const users = await fetchAllDocuments(COLLECTION_NAME);

        res.status(200).send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// Read - Отримати product за ID
router.get('/:id', async (
    req,
    res
) =>
{
    try {
        const movie = await Product.findById(req.params.id);
        if (!movie) {
            return res.status(404).send({ error: 'Product not found' });
        }
        res.status(200).send(movie);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update - Оновити product за ID
router.put('/:id', async (
    req,
    res
) =>
{
    try {

        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }
        res.status(200).send(movie);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete - Видалити product за ID
router.delete('/:id', async (
    req,
    res
) =>
{
    try {
        await deleteItem(COLLECTION_NAME, req.params.id)

        res.status(200).send({ message: 'product deleted' });
    } catch (error) {
        res.status(500).send(error);
    }
});





module.exports = router;