const Importer = require('mysql-import');
require('dotenv').config();

const restoreDb = async () => {
    const { MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST } = process.env;

    const importer = new Importer({
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        host: MYSQL_HOST,
      });

      await importer.import('./src/database/StoreManager.sql');

      await importer.disconnect();

      console.log('Database restored');
};

restoreDb();