const express = require('express');
require('express-async-errors');
const swaggerUi = require('swagger-ui-express');
const errorHandler = require('./middlewares/errorMiddleware');
const Router = require('./routes/index');
const swaggerDocs = require('../swagger.json');

const app = express();

app.use(express.json());

app.use('/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (_req, res) => {
  res.redirect('v1/docs');
});

app.use('/v1/products', Router.productsRouter);
app.use('/v1/sales', Router.salesRouter);
app.use(errorHandler);

module.exports = app;
