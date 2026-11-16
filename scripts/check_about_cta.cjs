const mysql = require('mysql2/promise');

const DB_CONFIG = {
  host: '194.59.164.108',
  user: 'u136421965_dieseluser',
  password: '8CIB1^gN',
  database: 'u136421965_dieseldb',
};

async function main() {
  const conn = await mysql.createConnection(DB_CONFIG);
  const [rows] = await conn.query("SELECT id, page_slug, section_key, title, subtitle, image_url FROM page_sections WHERE page_slug = 'about'");
  console.log('=== ABOUT SECTIONS IN DB ===');
  rows.forEach(r => {
    console.log(`[${r.id}] key=${r.section_key} | image=${r.image_url} | title=${r.title}`);
  });

  const [allCta] = await conn.query("SELECT id, page_slug, section_key, title, subtitle, image_url FROM page_sections WHERE section_key = 'cta'");
  console.log('\n=== ALL CTA SECTIONS IN DB ===');
  allCta.forEach(r => {
    console.log(`[${r.id}] page=${r.page_slug} key=${r.section_key} | image=${r.image_url} | title=${r.title}`);
  });

  await conn.end();
}

main().catch(console.error);
