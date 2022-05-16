const connection = require('./connection');

const getProducts = async () => {
  try {
    const [products] = await connection.query(`
      SELECT * FROM StoreManager.products
      ORDER BY id ASC
    `);
    return products;
  } catch (err) {
    console.log(err.message);
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
    console.log(err.message);
  }
};

module.exports = {
  getProducts,
  getProductById,
};