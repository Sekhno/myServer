const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secretKey = require('../../services/secret.service');
const {findByQuery, updateItem} = require("../../core/mongodb");

router.post('/profile', async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(400).send('Invalid token');
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        const {email} = decoded;

        const { details, address } =req.body

        await updateItem('users', {email}, {
            name: details.name + ' ' + details.lastName,
            email: details.email,
            details, address
        });

        res.status(200).send(req.user);
    } catch (error) {
        console.error('Помилка при розшифруванні токена:', error.message);
        return res.status(400).send(error.message);
    }
});

module.exports = router;