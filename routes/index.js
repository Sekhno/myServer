const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');

const {
  fetchAllDocuments,
  findByQuery,
  fetchCollectionByIds,
  fetchTopRatedProducts,
  fetchProductsByTag
} = require('../core/mongodb');
const {getProductsFromCart} = require('../core/utils');
const secretKey = require("../services/secret.service");
const {retrieveSimpleString} = require("../core/redis");


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

    drops = await fetchCollectionByIds('products', lastDrops);
  }
  else {
    const userID = uuidv4();
    const sessionID = uuidv4();
    const sessionTimestamp = new Date().toISOString();
    const cookieValue = `LatestSessionID=${sessionID}&LatestSessionTimestamp=${sessionTimestamp}&ID=${userID}`;

    drops = await fetchTopRatedProducts('products', -1, 5);

    if (req.cookies['NextVisitor']) {
      console.log(req.cookies['NextVisitor'])
    }
    else {
      res.cookie('NextVisitor', cookieValue, {
        httpOnly: false,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: 'Strict', // Захист від CSRF
      });
    }
  }

  res.render('index', {
    title: 'Internet Shop',
    // products: await fetchAllDocuments('products'),
    weddings: await fetchProductsByTag('products', -1, 8, 100),
    user: req.user,
    drops
  });
});

router.get('/cart', async (
    req,
    res, next
) =>
{
  res.render('cart', {
    title: 'Internet Shop - Shopping bag',
    products : await getProductsFromCart(req)
  });
});

router.get('/checkout', async (
    req,
    res, next
) =>
{
  res.render('checkout', {
    title: 'Internet Shop - Checkout',
    products : await getProductsFromCart(req)
  });
});


module.exports = router;


