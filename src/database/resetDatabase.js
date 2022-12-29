const Importer = require('mysql-import');
require('dotenv').config();

const restoreDb = async () => {
    const { MYSQLUSER, MYSQLPASSWORD, MYSQLHOST, MYSQLDATABASE } = process.env;

    const importer = new Importer({
        host: MYSQLHOST,
        user: MYSQLUSER,
        password: MYSQLPASSWORD,
        database: MYSQLDATABASE,
      });

      await importer.import('./src/database/StoreManager.sql');

      await importer.disconnect();

      console.log('Database restored');
};

restoreDb();