const mysql = require('mysql2/promise');

async function migrate() {
  const pool = mysql.createPool({
    host: '194.59.164.108',
    user: 'u136421965_dieseluser',
    password: '8CIB1^gN',
    database: 'u136421965_dieseldb',
    port: 3306,
  });

  try {
    const [cols] = await pool.query('DESCRIBE cms_services');
    const colNames = cols.map(c => c.Field);

    if (!colNames.includes('overview_image')) {
      console.log('Adding overview_image column to cms_services...');
      await pool.query('ALTER TABLE cms_services ADD COLUMN overview_image VARCHAR(500) NULL AFTER hero_image');
    }

    if (!colNames.includes('benefits_image')) {
      console.log('Adding benefits_image column to cms_services...');
      await pool.query('ALTER TABLE cms_services ADD COLUMN benefits_image VARCHAR(500) NULL AFTER overview_image');
    }

    console.log('Columns verified. Updating default service images...');

    const serviceDefaults = {
      'diesel-supply': {
        hero: '/images/service-diesel-hd.jpg',
        overview: '/images/detail-construction-overview.jpg',
        benefits: '/images/services-card-diesel.jpg'
      },
      'industrial-fuel': {
        hero: '/images/service-industrial-hd.jpg',
        overview: '/images/service-industrial.jpg',
        benefits: '/images/industry-manufacturing.jpg'
      },
      'marine-fuel': {
        hero: '/images/service-marine-hd.jpg',
        overview: '/images/service-card-marine-exact.jpg',
        benefits: '/images/service-marine.jpg'
      },
      'generator-fuel': {
        hero: '/images/service-generator-hd.jpg',
        overview: '/images/service-generator.jpg',
        benefits: '/images/services-card-generator.jpg'
      },
      'bulk-fuel-supply': {
        hero: '/images/service-bulk-hd.jpg',
        overview: '/images/service-bulk.jpg',
        benefits: '/images/services-card-bulk.jpg'
      },
      'fuel-storage-distribution': {
        hero: '/images/service-storage-hd.jpg',
        overview: '/images/services-hero-tanker.jpg',
        benefits: '/images/about-bento-tank.jpg'
      }
    };

    for (const [srvId, imgs] of Object.entries(serviceDefaults)) {
      // Check current values
      const [rows] = await pool.query('SELECT id, hero_image, overview_image, benefits_image FROM cms_services WHERE service_id = ?', [srvId]);
      if (rows.length > 0) {
        const row = rows[0];
        const newHero = row.hero_image || imgs.hero;
        const newOverview = row.overview_image || imgs.overview;
        const newBenefits = row.benefits_image || imgs.benefits;
        await pool.query(
          'UPDATE cms_services SET hero_image = ?, overview_image = ?, benefits_image = ? WHERE id = ?',
          [newHero, newOverview, newBenefits, row.id]
        );
      }
    }

    console.log('cms_services updated successfully!');

    // Also verify updated columns & data
    const [updatedRows] = await pool.query('SELECT id, service_id, title, hero_image, overview_image, benefits_image FROM cms_services');
    console.log('Updated services in DB:', updatedRows);
  } finally {
    await pool.end();
  }
}

migrate().catch(console.error);
