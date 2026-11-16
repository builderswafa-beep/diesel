const mysql = require('mysql2/promise');

async function main() {
  const conn = await mysql.createConnection({
    host: '194.59.164.108',
    user: 'u136421965_dieseluser',
    password: '8CIB1^gN',
    database: 'u136421965_dieseldb'
  });

  const [rows] = await conn.query("SELECT page_slug, section_key, title, subtitle, image_url, content_json FROM page_sections WHERE section_key = 'hero'");
  console.log(JSON.stringify(rows, null, 2));

  await conn.end();
}

main().catch(console.error);
