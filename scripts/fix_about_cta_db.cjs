const mysql = require('mysql2/promise');

const DB_CONFIG = {
  host: '194.59.164.108',
  user: 'u136421965_dieseluser',
  password: '8CIB1^gN',
  database: 'u136421965_dieseldb',
};

async function main() {
  const conn = await mysql.createConnection(DB_CONFIG);
  
  // Update about.cta with clean banner data
  await conn.query(`
    UPDATE page_sections 
    SET 
      title = 'Your Reliable Fuel Supply Partner in the UAE',
      subtitle = 'Contact us today for fuel supply, storage, and distribution solutions.',
      content_json = JSON_OBJECT('banner_mode', 'graphic', 'button_text', 'Get in Touch', 'button_link', '/contact'),
      image_url = '/uploads/about-us-last_1794650030829.png',
      status = 'published'
    WHERE page_slug = 'about' AND section_key = 'cta'
  `);
  console.log('Updated about.cta row in MySQL.');

  const [rows] = await conn.query("SELECT id, page_slug, section_key, title, subtitle, image_url, content_json FROM page_sections WHERE page_slug = 'about' AND section_key = 'cta'");
  console.log('Verified row:', rows[0]);

  await conn.end();
}

main().catch(console.error);
