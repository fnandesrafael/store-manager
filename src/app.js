const express = require('express');
require('express-async-errors');
const errorHandler = require('./middlewares/errorMiddleware');
const Router = require('./routes/index');

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.send();
});

app.use('/products', Router.productsRouter);
app.use('/sales', Router.salesRouter);
app.use(errorHandler);

module.exports = app;
