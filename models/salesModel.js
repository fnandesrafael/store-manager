const connection = require('./connection');

const getSales = async () => {
  try {
    const [sales] = await connection.query(`
      SELECT DISTINCT date, 
        sale_id AS saleId, product_id AS productId, quantity FROM StoreManager.sales_products
      INNER JOIN StoreManager.sales
      ORDER BY saleId, productId ASC
    `);
    return sales;
  } catch (err) {
    console.log('Erro na model getSales', err.message);
  }
};

const getSaleById = async (id) => {
  try {
    const [sale] = await connection.query(`
      SELECT DISTINCT date,
        product_id AS productId, quantity FROM StoreManager.sales_products
      INNER JOIN StoreManager.sales
      WHERE sale_id = ?`,
    [id]);
    return sale;
  } catch (err) {
    console.log('Erro na model getSaleById', err.message);
  }
};

module.exports = {
  getSales,
  getSaleById,
};