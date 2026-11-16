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

  // services.hero -> set banner_mode = graphic
  await conn.execute(
    "UPDATE page_sections SET content_json = JSON_SET(COALESCE(content_json, '{}'), '$.banner_mode', 'graphic') WHERE page_slug = 'services' AND section_key = 'hero'"
  );
  console.log('Updated services.hero banner_mode to graphic');

  await conn.end();
}

main().catch(console.error);
