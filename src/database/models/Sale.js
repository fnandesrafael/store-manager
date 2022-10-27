const connection = require('../connection');

const createSale = async (sales) => {
  const [queryResult] = await connection.query(`
    INSERT INTO StoreManager.sales
    VALUES()
  `);

  await sales.forEach((sale) => (
    connection.query(`
      INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
      VALUES (?, ?, ?)
    `, [queryResult.insertId, sale.productId, sale.quantity])
  ));
  
  return { id: queryResult.insertId, itemsSold: sales };
};

const getSales = async () => {
  const [queryResult] = await connection.query(`
    SELECT DISTINCT date, sale_id AS saleId, product_id AS productId, quantity
    FROM StoreManager.sales_products
    INNER JOIN StoreManager.sales ON id=sale_id
    ORDER BY sale_id ASC
  `);

  return queryResult;
};

const getSaleById = async (id) => {
  const [queryResult] = await connection.query(`
    SELECT DISTINCT date, sale_id AS saleId, product_id AS productId, quantity
    FROM StoreManager.sales_products
    INNER JOIN StoreManager.sales ON id=sale_id
    WHERE sale_id = ?`,
  [id]);
  
  return queryResult;
};

const editSale = async (id, sales) => {
  const [queryResult] = await Promise.all(sales.map(async (sale) => (
    connection.query(`
      UPDATE StoreManager.sales_products
      SET product_id = ?, quantity = ?
      WHERE sale_id = ?
    `, [sale.productId, sale.quantity, id])
  )));

  return queryResult;
};

const deleteSale = async (id) => {
  const [queryResult] = await connection.query(`
    SELECT * FROM StoreManager.sales
    WHERE id = ?
  `, [id]);
  
  if (queryResult.length === 0) {
    return [];
  }
  
  await connection.query(`
    DELETE FROM StoreManager.sales
    WHERE id = ?
  `, [id]);

  return queryResult;
};

module.exports = {
  createSale,
  getSales,
  getSaleById,
  editSale,
  deleteSale,
};