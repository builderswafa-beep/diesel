// create_media_table.cjs
// This script ensures the media_library table exists in the MySQL database.
// Run with: node scripts/create_media_table.cjs

const mysql = require('mysql2/promise');

(async () => {
  const pool = await mysql.createPool({
    host: '194.59.164.108',
    user: 'u136421965_dieseluser',
    password: '8CIB1^gN',
    database: 'u136421965_dieseldb',
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
  });
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS media_library (
        id INT AUTO_INCREMENT PRIMARY KEY,
        filename VARCHAR(255) NOT NULL,
        file_path VARCHAR(500) NOT NULL,
        file_size INT NOT NULL,
        mime_type VARCHAR(100) NOT NULL,
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    console.log('media_library table ensured');
  } finally {
    await pool.end();
  }
})();
