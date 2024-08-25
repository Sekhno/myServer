const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * Пояснення полів:
 *
 *    •	name: Ім’я користувача.
 *    •	email: Email користувача (повинен бути унікальним).
 *    •	password: Пароль користувача (хешується перед збереженням).
 *    •	isAdmin: Прапор, що визначає, чи є користувач адміністратором.
 *    •	address: Об’єкт, що містить адресу користувача.
 *    •	phone: Телефон користувача.
 *    •	orders: Масив замовлень, які належать користувачу (можна створити окрему схему для замовлень).
 *    •	createdAt: Дата створення користувача.
 *    •	updatedAt: Дата останнього оновлення користувача.
 * */

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    address: {
        street: String,
        city: String,
        postalCode: String,
        country: String
    },
    phone: String,
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date
});

// Хешування пароля перед збереженням
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;