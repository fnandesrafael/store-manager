const connection = require('./connection');

const getProducts = async () => {
  try {
    const [products] = await connection.query(`
      SELECT * FROM StoreManager.products
      ORDER BY id ASC
    `);
    return products;
  } catch (err) {
    console.log('Erro na model getProducts', err.message);
  }
};

const getProductById = async (id) => {
  try {
    const [product] = await connection.query(`
      SELECT * FROM StoreManager.products
      WHERE id = ?`,
    [id]);
    return product;
  } catch (err) {
    console.log('Erro na model getProductsById', err.message);
  }
};

const createProduct = async (productName) => {
  const { name, quantity } = productName;
  try {
    const [verifiedProduct] = await connection.query(`
      SELECT name FROM StoreManager.products
      WHERE name = ?
    `, [name]);

    if (verifiedProduct.length === 0) {
      const creationResult = await connection.query(`
        INSERT INTO StoreManager.products (name, quantity)
        VALUES(?, ?)
      `, [name, quantity]);
      const createdProduct = [{ id: creationResult[0].insertId, name, quantity }];
      return createdProduct;
    } return [];
  } catch (err) {
    console.log('Erro na model createProduct', err.message);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
};