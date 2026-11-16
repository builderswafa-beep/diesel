const mysql = require('mysql2/promise');

const DB_CONFIG = {
  host: '194.59.164.108',
  user: 'u136421965_dieseluser',
  password: '8CIB1^gN',
  database: 'u136421965_dieseldb',
};

async function main() {
  const conn = await mysql.createConnection(DB_CONFIG);
  
  // Check table structure
  const [cols] = await conn.query('DESCRIBE media_library');
  console.log('=== media_library COLUMNS ===');
  cols.forEach(c => console.log(`  ${c.Field} | ${c.Type} | ${c.Null} | ${c.Key}`));
  
  // Add category column if missing
  const hasCategory = cols.some(c => c.Field === 'category');
  if (!hasCategory) {
    console.log('\nAdding missing "category" column...');
    await conn.query("ALTER TABLE media_library ADD COLUMN category VARCHAR(50) DEFAULT 'upload'");
    console.log('Done.');
  } else {
    console.log('\ncategory column already exists.');
  }

  // Verify page_sections structure
  const [pCols] = await conn.query('DESCRIBE page_sections');
  console.log('\n=== page_sections COLUMNS ===');
  pCols.forEach(c => console.log(`  ${c.Field} | ${c.Type} | ${c.Null} | ${c.Key}`));

  // Clean up test upload
  const [testRows] = await conn.query("SELECT id FROM media_library WHERE filename LIKE 'test_%'");
  if (testRows.length) {
    await conn.query("DELETE FROM media_library WHERE filename LIKE 'test_%'");
    console.log(`\nCleaned up ${testRows.length} test uploads from DB`);
  }

  await conn.end();
}

main().catch(e => { console.error(e); process.exit(1); });
