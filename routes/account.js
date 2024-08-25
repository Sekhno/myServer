const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secretKey = require('../services/secret.service');
const {findByQuery} = require("../core/mongodb");

router.use(async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/register');
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        const {email} = decoded;

        req.user = await findByQuery('users', {email});

        next()
    } catch (error) {
        console.error('Помилка при розшифруванні токена:', error.message);
        return res.redirect('/register');
    }
});

router.get('/profile', async (req, res, next) => {
    console.log('req.user', req.user)

    res.render('profile', {
        title: 'Profile',
        user: req.user,
    });
});

// router.post('/logout', (req, res) => {
//     res
//         .cookie('token', '', { expires: new Date(0), httpOnly: true, secure: true })
//         .send({message: 'Logout successfully'});
//
//     // res.redirect('/');
// });

module.exports = router;