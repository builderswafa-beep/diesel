const mysql = require('mysql2/promise');

async function main() {
  const conn = await mysql.createConnection({
    host: '194.59.164.108',
    user: 'u136421965_dieseluser',
    password: '8CIB1^gN',
    database: 'u136421965_dieseldb'
  });

  const [rows] = await conn.query("SELECT id, page_slug, section_key, title, image_url, content_json FROM page_sections ORDER BY page_slug, section_key");
  for (const r of rows) {
    console.log(`${r.page_slug}.${r.section_key} -> img: ${r.image_url} | json: ${r.content_json}`);
  }

  await conn.end();
}

main().catch(console.error);
