const mysql = require('mysql2/promise');

async function inspectGallery() {
  const pool = mysql.createPool({
    host: '194.59.164.108',
    user: 'u136421965_dieseluser',
    password: '8CIB1^gN',
    database: 'u136421965_dieseldb',
    port: 3306,
  });

  try {
    const [cols] = await pool.query('DESCRIBE cms_gallery');
    console.log('cms_gallery columns:', cols.map(c => ({ field: c.Field, type: c.Type })));

    const [rows] = await pool.query('SELECT * FROM cms_gallery');
    console.log('cms_gallery rows count:', rows.length);
    console.log('cms_gallery sample rows:', rows.slice(0, 5));
  } finally {
    await pool.end();
  }
}

inspectGallery().catch(console.error);
