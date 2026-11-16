const mysql = require('mysql2/promise');

const DB_CONFIG = {
  host: '194.59.164.108',
  user: 'u136421965_dieseluser',
  password: '8CIB1^gN',
  database: 'u136421965_dieseldb',
};

async function main() {
  const conn = await mysql.createConnection(DB_CONFIG);

  // 1. Update services images in cms_services
  const serviceImages = [
    { id: 'diesel-supply', img: '/images/service-diesel-hd.jpg' },
    { id: 'industrial-fuel', img: '/images/service-industrial-hd.jpg' },
    { id: 'marine-fuel', img: '/images/service-marine-hd.jpg' },
    { id: 'generator-fuel', img: '/images/service-generator-hd.jpg' },
    { id: 'bulk-fuel-supply', img: '/images/service-bulk-hd.jpg' },
    { id: 'fuel-storage-distribution', img: '/images/service-storage-hd.jpg' },
  ];

  for (const s of serviceImages) {
    await conn.query('UPDATE cms_services SET hero_image = ? WHERE service_id = ?', [s.img, s.id]);
  }
  console.log('Updated cms_services hero_images.');

  // 2. Update page_sections CTA banners to text mode with clean skyline
  const ctaUpdates = [
    { page: 'about', title: 'Partner with a Trusted Fuel Supply Company in the UAE', sub: 'Get reliable, safe, and efficient fuel solutions for your business.' },
    { page: 'services', title: 'Need Bulk Diesel Delivered to Your Site?', sub: 'Talk to our fuel trading team today for priority schedule options.' },
    { page: 'projects', title: 'Have a Project Requirement?', sub: 'Get in touch with our team for a tailored fuel supply solution.' },
    { page: 'industries', title: 'Need a Custom Fuel Solution for Your Industry?', sub: 'Talk to our industrial fuel consultants for tailored bulk delivery and fuel storage.' },
  ];

  for (const c of ctaUpdates) {
    await conn.query(`
      UPDATE page_sections 
      SET 
        title = ?,
        subtitle = ?,
        image_url = '/images/cta-skyline-clean.jpg',
        content_json = JSON_OBJECT('banner_mode', 'text', 'button_text', 'Request a Quote', 'button_link', '/contact'),
        status = 'published'
      WHERE page_slug = ? AND section_key = 'cta'
    `, [c.title, c.sub, c.page]);
  }
  console.log('Updated CTA banners in page_sections.');

  const [services] = await conn.query('SELECT service_id, title, hero_image FROM cms_services');
  console.log('Services:', services);

  const [ctas] = await conn.query("SELECT page_slug, section_key, title, image_url, content_json FROM page_sections WHERE section_key = 'cta'");
  console.log('CTAs:', ctas);

  await conn.end();
}

main().catch(console.error);
