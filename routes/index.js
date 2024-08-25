const express = require('express');
const router = express.Router();
const {fetchAllDocuments, findByQuery} = require('../core/mongodb');
const jwt = require("jsonwebtoken");
const secretKey = require("../services/secret.service");

router.use(async (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, secretKey);
      const {email} = decoded;

      req.user = await findByQuery('users', {email});

      next()
    } catch (error) {
      console.error('Помилка при розшифруванні токена:', error.message);
      next(error)
    }
  }
  else {
    next()
  }
});

router.get('/', async (req, res, next) => {
  console.log('user', req.user);
  res.render('index', {
    title: 'Internet Shop',
    products: await fetchAllDocuments('top'),
    user: req.user
  });
});

module.exports = router;


