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

  const heroUpdates = [
    {
      page_slug: 'home',
      image_url: '/images/hero-terminal.jpg',
      title: 'Leading Fuel Solutions & Distribution in the UAE',
    },
    {
      page_slug: 'projects',
      image_url: '/images/projects-hero-banner.jpg',
      title: 'Our Projects',
    },
    {
      page_slug: 'services',
      image_url: '/images/services-hero-tanker.jpg',
      title: 'Our Fuel Supply Services',
    },
    {
      page_slug: 'about',
      image_url: '/images/about-hero-facility-bg.jpg',
      title: 'About Dubai Diesel Trading L.L.C.',
    },
    {
      page_slug: 'industries',
      image_url: '/images/industries-hero-panorama-exact.jpg',
      title: 'Industries We Serve',
    },
    {
      page_slug: 'contact',
      image_url: '/images/contact-hero-banner.jpg',
      title: 'Contact Our Fuel Logistics Team',
    },
    {
      page_slug: 'gallery',
      image_url: '/images/gallery-hero-banner.jpg',
      title: 'Corporate Gallery',
    },
  ];

  for (const h of heroUpdates) {
    await conn.execute(
      `UPDATE page_sections 
       SET image_url = ?,
           content_json = JSON_SET(COALESCE(content_json, '{}'), '$.banner_mode', 'text')
       WHERE page_slug = ? AND section_key = 'hero'`,
      [h.image_url, h.page_slug]
    );
    console.log(`Updated ${h.page_slug}.hero -> image: ${h.image_url}, banner_mode: text`);
  }

  // Also query and print out all hero rows to verify
  const [rows] = await conn.execute(
    "SELECT page_slug, section_key, title, subtitle, image_url, content_json FROM page_sections WHERE section_key = 'hero'"
  );
  console.log('All hero sections in DB now:', JSON.stringify(rows, null, 2));

  await conn.end();
}

main().catch(console.error);
