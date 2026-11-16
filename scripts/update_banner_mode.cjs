const mysql = require('mysql2/promise');

const DB_CONFIG = {
  host: '194.59.164.108',
  user: 'u136421965_dieseluser',
  password: '8CIB1^gN',
  database: 'u136421965_dieseldb',
  port: 3306,
};

async function main() {
  const conn = await mysql.createConnection(DB_CONFIG);
  
  // Update projects.hero banner_mode to graphic
  await conn.execute(
    "UPDATE page_sections SET content_json = JSON_SET(COALESCE(content_json, '{}'), '$.banner_mode', 'graphic') WHERE page_slug = 'projects' AND section_key = 'hero'"
  );
  console.log('Updated projects.hero');

  // Also check projects.cta
  await conn.execute(
    "UPDATE page_sections SET content_json = JSON_SET(COALESCE(content_json, '{}'), '$.banner_mode', 'graphic') WHERE page_slug = 'projects' AND section_key = 'cta'"
  );
  console.log('Updated projects.cta');

  // Verify
  const [rows] = await conn.execute(
    "SELECT page_slug, section_key, title, image_url, content_json FROM page_sections WHERE page_slug = 'projects'"
  );
  console.log('Projects sections:', rows);

  await conn.end();
}

main().catch(console.error);
