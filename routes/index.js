const express = require('express');
const router = express.Router();
const {fetchAllDocuments, findByQuery, fetchProductsByIds, fetchTopRatedProducts} = require('../core/mongodb');
const jwt = require("jsonwebtoken");
const secretKey = require("../services/secret.service");

router.use(async (
    req,
    res,
    next
) =>
{
  const token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, secretKey);
      const {email} = decoded;

      req.user = await findByQuery('users', {email});

      next()
    } catch (error) {
      console.error('Помилка при розшифруванні токена:', error.message);
      next()
    }
  }
  else {
    console.log('no token')
    next()
  }
});

router.get('/', async (
    req,
    res,
    next
) =>
{
  let drops = null;

  if (req.user) {
    const {lastDrops} = req.user.session;

    drops = await fetchProductsByIds('products', lastDrops);
  }
  else {
    drops = await fetchTopRatedProducts('products', -1, 5)
  }

  res.render('index', {
    title: 'Internet Shop',
    products: await fetchAllDocuments('products'),
    user: req.user,
    drops
  });
});

module.exports = router;


