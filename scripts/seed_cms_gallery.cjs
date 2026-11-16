const mysql = require('mysql2/promise');

const defaultGalleryItems = [
  {
    title: 'Dubai Diesel Storage Terminal & Vertical Tanks',
    category: 'terminals',
    image_url: '/images/about-terminal.jpg',
    caption: 'Bulk fuel storage tanks with dedicated gantry pumping systems adhering to UAE civil defense safety standards.',
    order_index: 1,
  },
  {
    title: 'Dubai Diesel Highway Delivery Tanker Fleet',
    category: 'fleet',
    image_url: '/images/about-tanker.jpg',
    caption: 'Certified road tankers equipped with calibrated digital flow meters for rapid on-site dispatch across the UAE.',
    order_index: 2,
  },
  {
    title: 'Vertical Bulk Fuel Storage Tanks with Official Signage',
    category: 'terminals',
    image_url: '/images/about-bento-tank.jpg',
    caption: 'High-capacity vertical fuel reservoirs with bilingual Dubai Diesel Trading L.L.C. branding.',
    order_index: 3,
  },
  {
    title: 'Gantry Fuel Loading & Metering Bay',
    category: 'fleet',
    image_url: '/images/about-bento-truck-bottom.jpg',
    caption: 'Automated loading gantry ensuring zero contamination and strict fuel provenance before road dispatch.',
    order_index: 4,
  },
  {
    title: 'Construction Heavy Equipment On-Site Refueling',
    category: 'industrial',
    image_url: '/images/industry-construction.jpg',
    caption: 'Direct-to-tank mobile fuel supply powering hydraulic excavators and tower cranes on UAE mega-projects.',
    order_index: 5,
  },
  {
    title: 'Manufacturing & Industrial Plant Fuel Support',
    category: 'industrial',
    image_url: '/images/industry-manufacturing.jpg',
    caption: 'Continuous industrial gas oil delivery supporting 24/7 manufacturing plants, boilers, and production lines.',
    order_index: 6,
  },
  {
    title: 'Marine Bunkering & Port Offshore Fuel Supply',
    category: 'marine',
    image_url: '/images/service-marine.jpg',
    caption: 'Marine Gas Oil (MGO) bunkering solutions for ocean cargo vessels, tugboats, and offshore platforms.',
    order_index: 7,
  },
  {
    title: 'Standby Diesel Generators for Emergency Backup Power',
    category: 'industrial',
    image_url: '/images/service-generator.jpg',
    caption: 'Dedicated generator fuel delivery ensuring zero downtime for critical commercial and industrial facilities.',
    order_index: 8,
  },
  {
    title: 'Bulk Fuel Logistics & Regional Transport Delivery',
    category: 'fleet',
    image_url: '/images/service-bulk.jpg',
    caption: 'Multi-compartment highway road tankers delivering high-volume diesel across Dubai, Abu Dhabi, and Northern Emirates.',
    order_index: 9,
  },
  {
    title: 'Oil & Gas Exploration & Field Operations Fueling',
    category: 'industrial',
    image_url: '/images/industry-oil-gas.jpg',
    caption: 'Dependable fuel supply for drilling rigs, extraction plants, and remote energy operations.',
    order_index: 10,
  },
  {
    title: 'Dubai Diesel Corporate Terminal Headquarters',
    category: 'terminals',
    image_url: '/images/about-hero-terminal-exact.jpg',
    caption: 'Corporate operations center and main terminal facilities located in Dubai, United Arab Emirates.',
    order_index: 11,
  },
  {
    title: 'Fleet Staging & Logistics Maintenance Yard',
    category: 'fleet',
    image_url: '/images/services-hero-tanker.jpg',
    caption: 'Dedicated vehicle depot where our logistics fleet undergoes routine safety, metering, and pressure inspections.',
    order_index: 12,
  },
];

async function seed() {
  const pool = mysql.createPool({
    host: '194.59.164.108',
    user: 'u136421965_dieseluser',
    password: '8CIB1^gN',
    database: 'u136421965_dieseldb',
    port: 3306,
  });

  try {
    const [existing] = await pool.query('SELECT COUNT(*) as count FROM cms_gallery');
    console.log('Current rows in cms_gallery:', existing[0].count);

    if (existing[0].count === 0) {
      console.log('Seeding 12 default gallery items...');
      for (const item of defaultGalleryItems) {
        await pool.query(
          'INSERT INTO cms_gallery (title, category, image_url, caption, order_index) VALUES (?, ?, ?, ?, ?)',
          [item.title, item.category, item.image_url, item.caption, item.order_index]
        );
      }
      console.log('Seeding complete!');
    }

    const [rows] = await pool.query('SELECT id, title, category, image_url FROM cms_gallery ORDER BY order_index ASC');
    console.log(`Verified ${rows.length} gallery items in DB:`);
    console.log(rows);
  } finally {
    await pool.end();
  }
}

seed().catch(console.error);
