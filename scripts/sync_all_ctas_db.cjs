const mysql = require('mysql2/promise');

async function syncDbCtas() {
  const pool = mysql.createPool({
    host: '194.59.164.108',
    user: 'u136421965_dieseluser',
    password: '8CIB1^gN',
    database: 'u136421965_dieseldb',
    port: 3306,
  });

  try {
    const [ctaRows] = await pool.query("SELECT id, page_slug, section_key, title, subtitle, image_url, content_json FROM page_sections WHERE section_key = 'cta'");
    console.log('Current CTA sections in DB:', ctaRows);

    for (const row of ctaRows) {
      let content = {};
      try {
        if (row.content_json) {
          content = typeof row.content_json === 'string' ? JSON.parse(row.content_json) : row.content_json;
        }
      } catch (e) {}

      // Force text banner mode and clean high-res skyline background
      content.banner_mode = 'text';

      await pool.query(
        'UPDATE page_sections SET image_url = ?, content_json = ? WHERE id = ?',
        ['/images/cta-skyline-clean.jpg', JSON.stringify(content), row.id]
      );
    }

    console.log('Successfully updated all CTA database entries to use /images/cta-skyline-clean.jpg and banner_mode=text!');
  } finally {
    await pool.end();
  }
}

syncDbCtas().catch(console.error);
