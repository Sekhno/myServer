const mongoose = require('mongoose');

/**
 * Пояснення полів:
 *
 *    •	name: Назва товару.
 *    •	description: Опис товару.
 *    •	price: Ціна товару.
 *    •	category: Категорія, до якої належить товар (наприклад, “електроніка”, “одяг”).
 *    •	brand: Бренд товару.
 *    •	stock: Кількість товару на складі.
 *    •	imageUrl: URL зображення товару.
 *    •	ratings: Об’єкт, що містить середній рейтинг та кількість голосів.
 *    •	createdAt: Дата створення товару.
 *    •	updatedAt: Дата останнього оновлення товару.
 * */

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true
    },
    brand: String,
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    imageUrl: {
        type: String,
        trim: true
    },
    ratings: {
        average: {
            type: Number,
            default: 0
        },
        count: {
            type: Number,
            default: 0
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date
});

productSchema
    .virtual('calculatedPrice')
    .get(function () {
        console.log(this);
        return 0;
    })
    .set(function (name) {
        console.log(this);
    });

productSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;