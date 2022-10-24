const express = require('express');
const Router = require('./routes/index');

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.send();
});

app.use('/products', Router.productsRouter);
app.use('/sales', Router.salesRouter);

module.exports = app;
