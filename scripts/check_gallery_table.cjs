const mysql = require('mysql2/promise');

async function check() {
  const pool = mysql.createPool({
    host: '194.59.164.108',
    user: 'u136421965_dieseluser',
    password: '8CIB1^gN',
    database: 'u136421965_dieseldb',
    port: 3306,
  });

  try {
    const [tables] = await pool.query("SHOW TABLES LIKE '%gallery%'");
    console.log('Gallery tables in DB:', tables);

    const [allTables] = await pool.query("SHOW TABLES");
    console.log('All tables in DB:', allTables.map(t => Object.values(t)[0]));
  } finally {
    await pool.end();
  }
}

check().catch(console.error);
