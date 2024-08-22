const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const crypto = require('crypto');
//
// Зазвичай ці дані зберігаються у базі даних
const users = [];
// const {firebaseApp, admin} = require('../firebase');
const secretKey = crypto.randomBytes(64).toString('hex');

console.log(secretKey);

const router = express.Router();

router.get('/', async function (req, res, next) {
    res.render('auth', {title: 'Auth'});
});

router.get('/register', async function (req, res, next) {
    res.render('register', {title: 'Register'});
});

router.post('/api/register', async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    // Перевірка наявності користувача
    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(400).send('User already exists');
    }

    // Хешування пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Збереження нового користувача
    users.push({ email, password: hashedPassword, firstName, lastName });

    res.status(201).send('User registered successfully');
});

router.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    // Пошук користувача в базі
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(400).send('Invalid email or password');
    }

    // Перевірка пароля
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).send('Invalid email or password');
    }

    // Створення JWT
    const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });

    res.send({ token });
});




router.post('/api/signup', function (req, res, next) {
    const {email, password} = req.body;

    // Створення JWT
    const token = jwt.sign({ username: email }, secretKey, { expiresIn: '1h' });

    res.send({ token });
    // const auth = admin.auth()
    //
    // auth.getUserByEmail(email)
    //     .then(user => {
    //         res.status(409).send({message: 'User already exists'});
    //     })
    //     .catch(async (err) => {
    //         const userResponse = await auth.createUser({
    //             email, password, emailVerified: false
    //         });
    //
    //         console.log('auth.sendSignInLinkToEmail',auth.sendSignInLinkToEmail)
    //         // admin.auth().sendSignInLinkToEmail(email).then(console.log);
    //
    //         res.json(userResponse);
    //     });
});



module.exports = router;

