const mysql = require('mysql2/promise');

async function main() {
  const conn = await mysql.createConnection({
    host: '194.59.164.108',
    user: 'u136421965_dieseluser',
    password: '8CIB1^gN',
    database: 'u136421965_dieseldb'
  });

  const [cols] = await conn.query("DESCRIBE page_sections");
  console.log('Columns:', cols.map(c => c.Field));

  const [rows] = await conn.query("SELECT * FROM page_sections WHERE section_key = 'cta'");
  console.log('Rows:', JSON.stringify(rows, null, 2));

  await conn.end();
}

main().catch(console.error);
