const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const {insertItem, findByQuery} = require('../../core/mongodb');
const {sendConfirmationEmail} = require('../../services/email.service');
const secretKey = require('../../services/secret.service');
const COLLECTION_NAME = 'users';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await findByQuery(COLLECTION_NAME,{ email });

    console.log('user', user);

    if (!user) {
        return res.status(400).send('Invalid email');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).send('Invalid password');
    }

    const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: false });
    res.send({ message: 'Successfully registered' });
});

router.post('/signup', async function (req, res) {
    const { email, password, name } = req.body;
    const userExists = await findByQuery(COLLECTION_NAME,{ email });

    if (userExists) {
        return res.status(400).send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await insertItem(COLLECTION_NAME, { name, email, password: hashedPassword, verified: false });

    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });

    sendConfirmationEmail(email, token);

    // res.status(201).send({ message: 'Successfully registered' });

});



module.exports = router;

