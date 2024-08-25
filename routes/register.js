const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const secretKey = require('../services/secret.service');
const {updateItem} = require("../core/mongodb");
const COLLECTION_NAME = 'users';

router.get('/', async (req, res) => {
    res.render('login', { title: 'Log In' });
});

router.get('/signup', async (req, res) => {
    res.render('register', { title: 'Sign Up' });
});

router.get('/confirm-email', async (req, res) => {
    const {token} = req.query;

    try {
        const decoded = jwt.verify(token, secretKey);
        const {email} = decoded;

        await updateItem(COLLECTION_NAME, {email}, {verified: true});

        res.redirect('/');
    } catch (error) {
        console.error('Помилка при розшифруванні токена:', error.message);
        res.redirect('/error')
    }
})

module.exports = router;