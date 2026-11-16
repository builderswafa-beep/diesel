// src/data/projectsData.js
// Complete data for Dubai Diesel Trading L.L.C. Our Projects Page
// Exactly matches media_1794566033912_49a73d29.jpg reference design.

export const projectCategories = [
  { id: 'all', name: 'All Projects', icon: 'grid' },
  { id: 'construction', name: 'Construction', icon: 'crane' },
  { id: 'manufacturing', name: 'Manufacturing', icon: 'factory' },
  { id: 'logistics', name: 'Logistics', icon: 'truck' },
  { id: 'power-generation', name: 'Power Generation', icon: 'lightning' },
  { id: 'marine-shipping', name: 'Marine & Shipping', icon: 'ship' },
  { id: 'oil-gas', name: 'Oil & Gas', icon: 'oil-rig' },
];

export const projectsList = [
  {
    id: 'construction-site-fuel-supply',
    categoryKey: 'construction',
    categoryLabel: 'Construction',
    categoryIcon: 'crane',
    title: 'Construction Site Fuel Supply',
    desc: 'Continuous diesel supply for large-scale construction operations in the UAE.',
    image: '/images/industry-construction.jpg',
    imageAlt: 'Construction site with tower cranes and multi-story concrete structures',
    waveColor: '#D51F26', // Red curve
    detailLink: '/industries/construction',
    serviceLink: '/services/diesel-supply',
    productKey: 'Ultra Low Sulfur Diesel (10ppm)',
    stats: {
      volume: '150,000+ IG/month',
      duration: 'Ongoing 24/7',
      location: 'Dubai & Northern Emirates'
    }
  },
  {
    id: 'manufacturing-plant-support',
    categoryKey: 'manufacturing',
    categoryLabel: 'Manufacturing',
    categoryIcon: 'factory',
    title: 'Manufacturing Plant Support',
    desc: 'Reliable and uninterrupted fuel supply for 24/7 manufacturing operations.',
    image: '/images/industry-manufacturing.jpg',
    imageAlt: 'Automated manufacturing facility with chemical distillation columns',
    waveColor: '#0A2246', // Navy curve
    detailLink: '/industries/manufacturing',
    serviceLink: '/services/industrial-fuel',
    productKey: 'Industrial Gas Oil',
    stats: {
      volume: '200,000+ IG/month',
      duration: 'Multi-year contract',
      location: 'Sharjah & Abu Dhabi Industrial Zones'
    }
  },
  {
    id: 'fleet-fuel-management',
    categoryKey: 'logistics',
    categoryLabel: 'Logistics',
    categoryIcon: 'truck',
    title: 'Fleet Fuel Management',
    desc: 'Bulk fuel supply for logistics and transportation fleets across multiple locations.',
    image: '/images/service-bulk.jpg',
    imageAlt: 'Highway bulk fuel road tanker delivering fleet diesel',
    waveColor: '#D51F26', // Red curve
    detailLink: '/industries/logistics-transport',
    serviceLink: '/services/bulk-fuel-supply',
    productKey: 'Ultra Low Sulfur Diesel (10ppm)',
    stats: {
      volume: '300+ Commercial Vehicles',
      duration: 'Daily scheduled drops',
      location: 'UAE Nationwide Depots'
    }
  },
  {
    id: 'backup-power-fuel-supply',
    categoryKey: 'power-generation',
    categoryLabel: 'Power Generation',
    categoryIcon: 'lightning',
    title: 'Backup Power Fuel Supply',
    desc: 'On-time diesel delivery for generators to ensure continuous operations.',
    image: '/images/service-generator.jpg',
    imageAlt: 'Industrial diesel generator units in outdoor power plant yard',
    waveColor: '#0A2246', // Navy curve
    detailLink: '/industries/power-generation',
    serviceLink: '/services/generator-fuel',
    productKey: 'Ultra Low Sulfur Diesel (10ppm)',
    stats: {
      volume: '24/7 Standby SLA',
      duration: 'Priority Emergency Response',
      location: 'Critical Infrastructure & Towers'
    }
  },
  {
    id: 'marine-operations-fuel-support',
    categoryKey: 'marine-shipping',
    categoryLabel: 'Marine & Shipping',
    categoryIcon: 'ship',
    title: 'Marine Operations Fuel Support',
    desc: 'High-quality marine fuel supply for shipping and offshore operations.',
    image: '/images/service-marine.jpg',
    imageAlt: 'Ocean container cargo ship underway in deep waters',
    waveColor: '#D51F26', // Red curve
    detailLink: '/industries/marine-shipping',
    serviceLink: '/services/marine-fuel',
    productKey: 'Marine Gas Oil (MGO)',
    stats: {
      volume: 'ISO 8217 DMA / MGO',
      duration: 'Truck-to-Ship (TTS)',
      location: 'Dubai Maritime City & Port Rashid'
    }
  },
  {
    id: 'oil-gas-operations',
    categoryKey: 'oil-gas',
    categoryLabel: 'Oil & Gas',
    categoryIcon: 'oil-rig',
    title: 'Oil & Gas Operations',
    desc: 'Dependable fuel solutions for exploration, production, and operational activities.',
    image: '/images/industry-oil-gas.jpg',
    imageAlt: 'Oil pumpjack nodding donkey silhouette at sunset drilling site',
    waveColor: '#0A2246', // Navy curve
    detailLink: '/industries/oil-gas',
    serviceLink: '/services/storage-distribution',
    productKey: 'Industrial Gas Oil',
    stats: {
      volume: 'Onshore Exploration',
      duration: 'ADNOC / CICPA Approved',
      location: 'Western Region & Desert Sites'
    }
  }
];

export const projectHighlights = [
  {
    id: 'stat-1',
    value: '50+',
    label: 'Projects Delivered',
    icon: 'users'
  },
  {
    id: 'stat-2',
    value: '100%',
    label: 'On-Time Supply',
    icon: 'hard-hat'
  },
  {
    id: 'stat-3',
    value: 'Trusted',
    label: 'Industry Partnerships',
    icon: 'handshake'
  },
  {
    id: 'stat-4',
    value: 'Reliable',
    label: 'Fuel Solutions',
    icon: 'award'
  }
];
