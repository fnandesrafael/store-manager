const Importer = require('mysql-import');
require('dotenv').config();

const restoreDb = async () => {
    const { MYSQLUSER, MYSQLPASSWORD, MYSQLHOST } = process.env;

    const importer = new Importer({
        user: MYSQLUSER,
        password: MYSQLPASSWORD,
        host: MYSQLHOST,
      });

      await importer.import('./src/database/StoreManager.sql');

      await importer.disconnect();

      console.log('Database restored');
};

restoreDb();