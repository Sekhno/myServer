const {fetchCollectionByIds} = require("./mongodb");
const {retrieveSimpleString} = require("./redis");

const parseCookieString = (cookieString) =>
{
    return cookieString.split('&').reduce((acc, pair) => {
        const [key, value] = pair.split('='); // Розділяємо ключ і значення
        acc[key] = value; // Додаємо в об'єкт
        return acc;
    }, {});
};

/**
 * Get Products for Visitor
 * @param req
 * */
const getProductsFromCart = async function(req)
{
    const visitor = req.cookies['NextVisitor'];

    const {LatestSessionID} = parseCookieString(visitor);
    const cart = JSON.parse(await retrieveSimpleString(LatestSessionID)) || [];

    const ids = cart.map(item => item.productId);
    const products = await fetchCollectionByIds('products', ids);

    for (let i=0; i<products.length; i++) {
        const product = products[i];
        const curtItem = cart.find(({productId}) => product._id.valueOf() === productId);

        Object.assign(product, curtItem);
    }

    return products;
}

module.exports = {parseCookieString, getProductsFromCart}