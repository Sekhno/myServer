const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');


const indexRouter = require('./routes/index');

const accountRouter = require('./routes/account');

const productRouter = require('./routes/product');
const apiProductRouter = require('./routes/crud/product');

const registerRouter = require('./routes/register');
const apiRegisterRouter = require('./routes/crud/register');



const backEndRouter = require('./routes/back-end');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json({ limit: '50mb' })); // Збільшуємо допустимий розмір JSON запитів
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // Збільшуємо допустимий розмір URL-



app.use('/', indexRouter);

app.use('/product', productRouter);
app.use('/api/v1/products', apiProductRouter);

app.use('/register', registerRouter);
app.use('/api/v1/register', apiRegisterRouter);

app.use('/account', accountRouter);

app.use('/admin', backEndRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err.message);
  // console.log(err)

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
