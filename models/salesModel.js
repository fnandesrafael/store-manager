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

const createSale = async (sales) => {
  try {
    const [saleRegistry] = await connection.query(`
      INSERT INTO StoreManager.sales
      VALUES()
    `);
    await sales.forEach((sale) => (
      connection.query(`
        INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
        VALUES (?, ?, ?)
      `, [saleRegistry.insertId, sale.productId, sale.quantity])
    ));
    const createdSale = { id: saleRegistry.insertId, itemsSold: sales };
    return createdSale;
  } catch (err) {
    console.log('Erro na model createSale', err.message);
  }
};

module.exports = {
  getSales,
  getSaleById,
  createSale,
};