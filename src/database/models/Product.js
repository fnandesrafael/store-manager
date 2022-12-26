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
  const [queryResult] = await connection.query(`
    SELECT * FROM StoreManager.products
    ORDER BY id ASC
  `);
  
  return queryResult;
};

const getProductById = async (id) => {
  const [queryResult] = await connection.query(`
    SELECT * FROM StoreManager.products
    WHERE id = ?`,
  [id]);
 
  return queryResult;
};

const editProduct = async (id, product) => {
  const { name, quantity } = product;
  
  const [queryResult] = await connection.query(`
    UPDATE StoreManager.products
    SET name = ?, quantity = ?
    WHERE id = ?
  `, [name, quantity, id]);

  return queryResult;
};

const deleteProduct = async (id) => {
  const [queryResult] = await connection.query(`
    DELETE FROM StoreManager.products
    WHERE id = ?
  `, [id]);
  
  return queryResult;
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  editProduct,
  deleteProduct,
};