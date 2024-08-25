const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secretKey = require('../services/secret.service');
const {findByQuery} = require("../core/mongodb");

router.use(async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        console.log('no token');
        return res.redirect('/register');
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        const {email} = decoded;

        req.user = await findByQuery('users', {email});

        if (req.user.role === 'administrator') {
            next()
        }
        else {
            return res.redirect('/');
        }
    } catch (error) {
        console.error('Помилка при розшифруванні токена:', error.message);
        return res.redirect('/register');
    }



});

router.get('/', async (req, res, next) => {
    console.log('req.user', req.user)

    res.render('backEnd/index', { title: 'Admin' });
});

module.exports = router;