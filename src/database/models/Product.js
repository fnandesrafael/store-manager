const connection = require('../connection');

const createProduct = async (product) => {
  const { name, quantity } = product;
  const queryResult = await connection.query(`
    INSERT INTO StoreManager.products (name, quantity)
    VALUES(?, ?)
  `, [name, quantity]);

  return { id: queryResult[0].insertId, name, quantity };
};

const getProducts = async () => {
  const [products] = await connection.query(`
    SELECT * FROM StoreManager.products
    ORDER BY id ASC
  `);
  
  return products;
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

const editProduct = async (product) => {
  const { id, name, quantity } = product;
  
  try {
    const [verifiedProduct] = await connection.query(`
      SELECT * FROM StoreManager.products
      WHERE id = ?
    `, [id]);
    if (verifiedProduct.length === 0) {
      return verifiedProduct;
    } const editionResult = await connection.query(`
      UPDATE StoreManager.products
      SET name = ?, quantity = ?
      WHERE id = ?
    `, [name, quantity, id]);
    return editionResult;
  } catch (err) {
    console.log('Erro na model editProduct', err.message);
  }
};

const deleteProduct = async (productId) => {
  try {
    const [verifiedProduct] = await connection.query(`
      SELECT * FROM StoreManager.products
      WHERE id = ?
    `, [productId]);
    if (verifiedProduct.length > 0) {
      await connection.query(`
        DELETE FROM StoreManager.products
        WHERE id = ?
      `, [productId]);
    } return verifiedProduct;
  } catch (err) {
    console.log('Erro na model deleteProduct', err.messag);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  editProduct,
  deleteProduct,
};