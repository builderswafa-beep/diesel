const mysql = require('mysql2/promise');

async function test() {
  const pool = mysql.createPool({
    host: '194.59.164.108',
    user: 'u136421965_dieseluser',
    password: '8CIB1^gN',
    database: 'u136421965_dieseldb',
    port: 3306,
  });

  try {
    const [cols] = await pool.query('DESCRIBE cms_services');
    console.log('cms_services columns:', cols.map(c => c.Field));

    const [services] = await pool.query('SELECT id, service_id, title, hero_image FROM cms_services');
    console.log('services in DB:', services);

    const [secRows] = await pool.query("SELECT id, page_slug, section_key, title, image_url FROM page_sections WHERE page_slug LIKE 'service%'");
    console.log('service page sections in DB count:', secRows.length);
    console.log('service page sections:', secRows);
  } finally {
    await pool.end();
  }
}

test().catch(console.error);
