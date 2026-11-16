// src/data/industryDetails.js
// Comprehensive data for Dubai Diesel Trading L.L.C. Service / Industry Detail Pages

export const industryDetails = {
  construction: {
    id: 'construction',
    name: 'Construction',
    productKey: 'Ultra Low Sulfur Diesel (10ppm)',
    breadcrumbCategory: 'Our Services',
    breadcrumbLink: '/services',
    heroImage: '/images/detail-construction-hero.jpg',
    heroTitle: 'Construction',
    heroSubtitle: 'Reliable fuel supply solutions for construction projects of every scale across the UAE.',
    
    // Overview section
    overviewEyebrow: 'OUR SERVICE',
    overviewTitle: 'Fuel Supply for',
    overviewTitleHighlight: 'Construction',
    overviewDesc: 'We provide a consistent and high-quality fuel supply for construction companies, contractors and project sites across the UAE. Our reliable delivery and flexible supply options ensure your equipment, generators and on-site operations run efficiently without delays.',
    overviewImage: '/images/detail-construction-overview.jpg',
    overviewImageAlt: 'Dubai Diesel delivery tanker truck stationed at a high-rise construction site',

    // Why Choose & 4 Pillars
    whyChooseTitle: 'Why Choose Our',
    whyChooseTitleHighlight: 'Construction',
    whyChooseTitleSuffix: 'Fuel Supply?',
    whyChooseDesc: 'Construction projects require a steady and dependable fuel supply to keep equipment, machinery and site operations running on schedule. Dubai Diesel Trading L.L.C. ensures uninterrupted, on-time and safe fuel delivery tailored to your project needs.',
    pillars: [
      {
        id: 'uninterrupted',
        label: 'Uninterrupted',
        sublabel: 'Supply',
        icon: 'droplet'
      },
      {
        id: 'quality',
        label: 'High-Quality',
        sublabel: 'Fuel',
        icon: 'shield-check'
      },
      {
        id: 'ontime',
        label: 'On-Time',
        sublabel: 'Delivery',
        icon: 'truck'
      },
      {
        id: 'support',
        label: 'Dedicated',
        sublabel: 'Support',
        icon: 'headset'
      }
    ],

    // Key Benefits
    benefitsPhoto: '/images/detail-construction-benefits.jpg',
    benefitsPhotoAlt: 'Heavy yellow crawler excavator on construction site with Dubai skyline in background',
    benefitsEyebrow: 'Key Benefits',
    keyBenefits: [
      'Reliable and consistent fuel availability for project sites',
      'High-quality, industry-compliant diesel (EN 590)',
      'Flexible and scalable supply for short and long-term projects',
      'Timely delivery across all UAE locations',
      'Support from an experienced and responsive team'
    ],

    // Applications in [Industry]
    applicationsTitle: 'Applications in Construction',
    applications: [
      {
        id: 'app-1',
        title: 'Construction Equipment',
        desc: 'Fuel for excavators, loaders, cranes and other heavy machinery.',
        icon: 'excavator'
      },
      {
        id: 'app-2',
        title: 'Power Generators',
        desc: 'Reliable fuel for on-site generators and backup systems.',
        icon: 'generator'
      },
      {
        id: 'app-3',
        title: 'Site Operations',
        desc: 'Continuous supply for round-the-clock construction activities.',
        icon: 'tower-crane'
      },
      {
        id: 'app-4',
        title: 'Project Sites',
        desc: 'Fuel solutions for small, medium and large-scale construction projects.',
        icon: 'barrier'
      }
    ],

    // Related Services (3 cards)
    relatedTitle: 'Related Services',
    related: ['manufacturing', 'logistics-transport', 'power-generation'],

    // Bottom CTA
    ctaTitle: 'Need a Reliable Fuel Partner for Your Construction Project?',
    ctaSubtitle: 'Get a tailored fuel supply solution from Dubai Diesel Trading L.L.C.'
  },

  manufacturing: {
    id: 'manufacturing',
    name: 'Manufacturing',
    productKey: 'Industrial Gas Oil',
    breadcrumbCategory: 'Our Services',
    breadcrumbLink: '/services',
    heroImage: '/images/industries-hero-panorama-exact.jpg',
    heroTitle: 'Manufacturing',
    heroSubtitle: 'Continuous, dependable industrial fuel supply ensuring non-stop factory and production operations.',
    
    // Overview section
    overviewEyebrow: 'OUR SERVICE',
    overviewTitle: 'Fuel Supply for',
    overviewTitleHighlight: 'Manufacturing',
    overviewDesc: 'We supply industrial-grade fuels to manufacturing plants, processing facilities, and fabrication yards throughout the UAE. Our scheduled bulk deliveries ensure uninterrupted continuous operation of boilers, kilns, furnaces, and manufacturing machinery.',
    overviewImage: '/images/service-industrial.jpg',
    overviewImageAlt: 'Dubai Diesel industrial fuel supply at modern automated manufacturing facility',

    // Why Choose & 4 Pillars
    whyChooseTitle: 'Why Choose Our',
    whyChooseTitleHighlight: 'Manufacturing',
    whyChooseTitleSuffix: 'Fuel Supply?',
    whyChooseDesc: 'Manufacturing facilities operate on strict production schedules where fuel interruptions cause costly downtime. Dubai Diesel Trading L.L.C. provides guaranteed supply contracts, real-time monitoring, and emergency top-ups to safeguard productivity.',
    pillars: [
      {
        id: 'uninterrupted',
        label: 'Uninterrupted',
        sublabel: 'Supply',
        icon: 'droplet'
      },
      {
        id: 'quality',
        label: 'High-Quality',
        sublabel: 'Fuel',
        icon: 'shield-check'
      },
      {
        id: 'ontime',
        label: 'Scheduled',
        sublabel: 'Delivery',
        icon: 'truck'
      },
      {
        id: 'support',
        label: 'Dedicated',
        sublabel: 'Account Mgr',
        icon: 'headset'
      }
    ],

    // Key Benefits
    benefitsPhoto: '/images/industry-manufacturing.jpg',
    benefitsPhotoAlt: 'Automated factory floor and industrial manufacturing plant machinery',
    benefitsEyebrow: 'Key Benefits',
    keyBenefits: [
      'Consistent high-grade diesel (EN 590) with verified low sulfur content',
      'Bulk supply schedules tailored to shift production demands',
      'On-site tank management and consumption forecasting',
      'Strict environmental and UAE industrial safety compliance',
      'Rapid emergency refuelling within guaranteed response windows'
    ],

    // Applications
    applicationsTitle: 'Applications in Manufacturing',
    applications: [
      {
        id: 'app-1',
        title: 'Industrial Boilers & Furnaces',
        desc: 'Dependable high-caloric fuel for heating, smelting, and thermal processing units.',
        icon: 'factory'
      },
      {
        id: 'app-2',
        title: 'Production Machinery',
        desc: 'Clean diesel keeping automated production lines and heavy equipment operating smoothly.',
        icon: 'cogs'
      },
      {
        id: 'app-3',
        title: 'Facility Backup Power',
        desc: 'Uninterrupted fuel supply for continuous factory backup generator systems.',
        icon: 'generator'
      },
      {
        id: 'app-4',
        title: 'Fleet & Yard Logistics',
        desc: 'On-site refuelling for forklifts, yard trucks, and internal material handlers.',
        icon: 'forklift'
      }
    ],

    // Related Services
    relatedTitle: 'Related Services',
    related: ['logistics-transport', 'power-generation', 'construction'],

    // Bottom CTA
    ctaTitle: 'Need an Uninterrupted Fuel Supply for Your Manufacturing Plant?',
    ctaSubtitle: 'Get a tailored fuel supply solution from Dubai Diesel Trading L.L.C.'
  },

  'logistics-transport': {
    id: 'logistics-transport',
    name: 'Logistics & Transport',
    productKey: 'Ultra Low Sulfur Diesel (10ppm)',
    breadcrumbCategory: 'Our Services',
    breadcrumbLink: '/services',
    heroImage: '/images/services-hero-tanker.jpg',
    heroTitle: 'Logistics & Transport',
    heroSubtitle: 'Direct-to-fleet and yard fueling solutions keeping UAE commercial transport on the move.',
    
    // Overview section
    overviewEyebrow: 'OUR SERVICE',
    overviewTitle: 'Fuel Supply for',
    overviewTitleHighlight: 'Logistics & Transport',
    overviewDesc: 'We deliver high-grade automotive and fleet diesel to logistics hubs, fleet yards, and distribution centers across the UAE. Our direct-to-tank and yard delivery services keep commercial fleets moving on schedule and within budget.',
    overviewImage: '/images/service-bulk.jpg',
    overviewImageAlt: 'Dubai Diesel highway bulk road tanker delivering fleet fuel',

    // Why Choose & 4 Pillars
    whyChooseTitle: 'Why Choose Our',
    whyChooseTitleHighlight: 'Fleet & Logistics',
    whyChooseTitleSuffix: 'Fuel Solutions?',
    whyChooseDesc: 'Fleet efficiency and punctuality depend on predictable fuel quality and flexible delivery timing. Dubai Diesel Trading L.L.C. offers specialized fleet refuelling, on-site storage solutions, and transparent batch ticketing for total route continuity.',
    pillars: [
      {
        id: 'yard',
        label: 'Direct Yard',
        sublabel: 'Delivery',
        icon: 'truck'
      },
      {
        id: 'quality',
        label: 'EN 590',
        sublabel: 'Certified',
        icon: 'shield-check'
      },
      {
        id: 'ontime',
        label: 'Flexible Hours',
        sublabel: 'Night/Day',
        icon: 'clock'
      },
      {
        id: 'pricing',
        label: 'Competitive',
        sublabel: 'Volume Rates',
        icon: 'tag'
      }
    ],

    // Key Benefits
    benefitsPhoto: '/images/services-card-diesel.jpg',
    benefitsPhotoAlt: 'Commercial fleet depot with refueling island and modern haulage trucks',
    benefitsEyebrow: 'Key Benefits',
    keyBenefits: [
      'Direct-to-vehicle mobile fueling during fleet idle hours',
      'Clean EN 590 (10ppm) diesel that extends engine and filter life',
      'Digital volume metering and automated batch delivery receipts',
      'Rapid dispatch across Dubai, Abu Dhabi, Sharjah, and Northern Emirates',
      'Long-term rate stability and tailored bulk discount structures'
    ],

    // Applications
    applicationsTitle: 'Applications in Logistics & Transport',
    applications: [
      {
        id: 'app-1',
        title: 'Commercial Truck Fleets',
        desc: 'Regular fueling for heavy goods vehicles, long-haul trailers, and delivery vans.',
        icon: 'truck'
      },
      {
        id: 'app-2',
        title: 'Distribution Depots',
        desc: 'Bulk supply into on-site above-ground tanks with metered dispensing units.',
        icon: 'warehouse'
      },
      {
        id: 'app-3',
        title: 'Bus & Coach Operators',
        desc: 'Overnight terminal refuelling ensuring morning passenger routes start on time.',
        icon: 'bus'
      },
      {
        id: 'app-4',
        title: 'Cargo & Freight Yards',
        desc: 'Dedicated fuel support for container handlers, reach stackers, and yard shifters.',
        icon: 'crane'
      }
    ],

    // Related Services
    relatedTitle: 'Related Services',
    related: ['manufacturing', 'marine-shipping', 'power-generation'],

    // Bottom CTA
    ctaTitle: 'Looking to Optimize Fuel Operations for Your Transport Fleet?',
    ctaSubtitle: 'Get a tailored fuel supply solution from Dubai Diesel Trading L.L.C.'
  },

  'power-generation': {
    id: 'power-generation',
    name: 'Power Generation',
    productKey: 'Ultra Low Sulfur Diesel (10ppm)',
    breadcrumbCategory: 'Our Services',
    breadcrumbLink: '/services',
    heroImage: '/images/service-card-generator-exact.jpg',
    heroTitle: 'Power Generation',
    heroSubtitle: 'Mission-critical diesel fuel delivery ensuring 24/7 power continuity for primary and standby generators.',
    
    // Overview section
    overviewEyebrow: 'OUR SERVICE',
    overviewTitle: 'Fuel Supply for',
    overviewTitleHighlight: 'Power Generation',
    overviewDesc: 'We specialize in priority diesel delivery for primary, standby, and emergency power generators across commercial, industrial, healthcare, and remote project facilities throughout the Emirates.',
    overviewImage: '/images/service-generator.jpg',
    overviewImageAlt: 'Heavy-duty industrial generator unit fueled by Dubai Diesel',

    // Why Choose & 4 Pillars
    whyChooseTitle: 'Why Choose Our',
    whyChooseTitleHighlight: 'Power Generation',
    whyChooseTitleSuffix: 'Fuel Supply?',
    whyChooseDesc: 'Power generators are the lifeline of critical infrastructure, hospitals, remote sites, and major events. Dubai Diesel Trading L.L.C. provides guaranteed SLA response times, premium low-ash diesel, and automated tank replenishment.',
    pillars: [
      {
        id: 'sla',
        label: 'Guaranteed',
        sublabel: '24/7 SLA',
        icon: 'clock'
      },
      {
        id: 'quality',
        label: 'Low-Ash',
        sublabel: 'EN 590 Fuel',
        icon: 'shield-check'
      },
      {
        id: 'monitoring',
        label: 'Automated',
        sublabel: 'Monitoring',
        icon: 'activity'
      },
      {
        id: 'support',
        label: 'Priority',
        sublabel: 'Dispatch',
        icon: 'truck'
      }
    ],

    // Key Benefits
    benefitsPhoto: '/images/services-card-generator.jpg',
    benefitsPhotoAlt: 'Industrial standby power generator plant and acoustic enclosures',
    benefitsEyebrow: 'Key Benefits',
    keyBenefits: [
      'Zero downtime commitment with scheduled automatic top-up schedules',
      'Premium EN 590 10ppm diesel formulated for generator longevity and low emissions',
      '24/7 priority emergency response during unexpected grid outages',
      'Certified fuel testing documentation and water-free fuel guarantees',
      'Flexible supply agreements for temporary event power or permanent installations'
    ],

    // Applications
    applicationsTitle: 'Applications in Power Generation',
    applications: [
      {
        id: 'app-1',
        title: 'Emergency Standby Generators',
        desc: 'Critical fuel reserves for hospitals, data centers, and commercial high-rise towers.',
        icon: 'hospital'
      },
      {
        id: 'app-2',
        title: 'Remote Island & Desert Grids',
        desc: 'Dependable bulk supply for off-grid operations and isolated work camps.',
        icon: 'sun'
      },
      {
        id: 'app-3',
        title: 'Temporary Event Power',
        desc: 'Dedicated fuel logistics for major exhibitions, concerts, and outdoor festivals.',
        icon: 'calendar'
      },
      {
        id: 'app-4',
        title: 'Industrial Prime Power',
        desc: 'High-volume continuous supply for continuous heavy industrial generator sets.',
        icon: 'generator'
      }
    ],

    // Related Services
    relatedTitle: 'Related Services',
    related: ['construction', 'manufacturing', 'oil-gas'],

    // Bottom CTA
    ctaTitle: 'Require Mission-Critical Fuel Support for Your Generators?',
    ctaSubtitle: 'Get a tailored fuel supply solution from Dubai Diesel Trading L.L.C.'
  },

  'marine-shipping': {
    id: 'marine-shipping',
    name: 'Marine & Shipping',
    productKey: 'Marine Gas Oil (MGO)',
    breadcrumbCategory: 'Our Services',
    breadcrumbLink: '/services',
    heroImage: '/images/service-marine.jpg',
    heroTitle: 'Marine & Shipping',
    heroSubtitle: 'Certified Marine Gas Oil (MGO) and bunkering services for vessels calling ports across the UAE.',
    
    // Overview section
    overviewEyebrow: 'OUR SERVICE',
    overviewTitle: 'Fuel Supply for',
    overviewTitleHighlight: 'Marine & Shipping',
    overviewDesc: 'We provide compliant marine gas oil (MGO) and bunkering services for commercial vessels, tugboats, offshore supply vessels, and luxury yachts at major UAE ports and anchorage points.',
    overviewImage: '/images/service-marine.jpg',
    overviewImageAlt: 'Cargo container ship bunkering at Dubai marine terminal',

    // Why Choose & 4 Pillars
    whyChooseTitle: 'Why Choose Our',
    whyChooseTitleHighlight: 'Marine Bunkering',
    whyChooseTitleSuffix: 'Solutions?',
    whyChooseDesc: 'Maritime operations demand strict compliance with international MARPOL conventions and local port authority standards. Dubai Diesel Trading L.L.C. delivers certified DMA/MGO specifications with flawless barge and truck-to-ship coordination.',
    pillars: [
      {
        id: 'marpol',
        label: 'MARPOL VI',
        sublabel: 'Compliant',
        icon: 'shield-check'
      },
      {
        id: 'berth',
        label: 'Port & Berth',
        sublabel: 'Delivery',
        icon: 'anchor'
      },
      {
        id: 'turnaround',
        label: 'Rapid Berth',
        sublabel: 'Turnaround',
        icon: 'clock'
      },
      {
        id: 'lab',
        label: 'Certified Lab',
        sublabel: 'Testing',
        icon: 'droplet'
      }
    ],

    // Key Benefits
    benefitsPhoto: '/images/service-card-marine-exact.jpg',
    benefitsPhotoAlt: 'Marine fueling bunkering hose connection at container terminal port',
    benefitsEyebrow: 'Key Benefits',
    keyBenefits: [
      'Fully certified ISO 8217 DMA / MGO with low sulfur profile (<0.10% / <0.50%)',
      'Safe truck-to-ship (TTS) and barge-to-ship bunkering at UAE ports',
      'Seamless coordination with port agents, coast guard, and customs authorities',
      'Rapid bunkering turnaround to minimize vessel idle time in port',
      'Sealed laboratory samples provided with every Bunker Delivery Note (BDN)'
    ],

    // Applications
    applicationsTitle: 'Applications in Marine & Shipping',
    applications: [
      {
        id: 'app-1',
        title: 'Commercial Cargo Ships',
        desc: 'Compliant MGO bunkering for international ocean freight vessels calling UAE.',
        icon: 'ship'
      },
      {
        id: 'app-2',
        title: 'Offshore Support Vessels (OSV)',
        desc: 'Dedicated fuel logistics for crew boats, supply vessels, and anchor handlers.',
        icon: 'anchor'
      },
      {
        id: 'app-3',
        title: 'Tugboats & Port Craft',
        desc: 'Reliable regular supply for harbor tugs, dredgers, and pilot vessels.',
        icon: 'compass'
      },
      {
        id: 'app-4',
        title: 'Yachts & Passenger Vessels',
        desc: 'Clean, ultra-pure fuel for mega-yachts, ferries, and luxury commercial charters.',
        icon: 'life-buoy'
      }
    ],

    // Related Services
    relatedTitle: 'Related Services',
    related: ['logistics-transport', 'oil-gas', 'manufacturing'],

    // Bottom CTA
    ctaTitle: 'Need Reliable Marine Bunkering Services in the UAE?',
    ctaSubtitle: 'Get a tailored fuel supply solution from Dubai Diesel Trading L.L.C.'
  },

  'oil-gas': {
    id: 'oil-gas',
    name: 'Oil & Gas',
    productKey: 'Industrial Gas Oil',
    breadcrumbCategory: 'Our Services',
    breadcrumbLink: '/services',
    heroImage: '/images/industry-oil-gas.jpg',
    heroTitle: 'Oil & Gas',
    heroSubtitle: 'ADNOC-compliant fuel distribution for onshore drilling, refineries, and remote energy infrastructure.',
    
    // Overview section
    overviewEyebrow: 'OUR SERVICE',
    overviewTitle: 'Fuel Supply for',
    overviewTitleHighlight: 'Oil & Gas Sector',
    overviewDesc: 'We deliver certified industrial fuels, rig diesel, and specialized lubricant support to onshore exploration, drilling camps, refineries, and pipeline maintenance projects across the UAE.',
    overviewImage: '/images/industry-oil-gas.jpg',
    overviewImageAlt: 'Oil and gas terminal facilities and processing pipelines in UAE',

    // Why Choose & 4 Pillars
    whyChooseTitle: 'Why Choose Our',
    whyChooseTitleHighlight: 'Oil & Gas Industry',
    whyChooseTitleSuffix: 'Fuel Services?',
    whyChooseDesc: 'The oil and gas industry operates under the world\'s most stringent health, safety, and security standards. Dubai Diesel Trading L.L.C. maintains full ADNOC-approved logistics standards, certified drivers, and desert-ready delivery tankers.',
    pillars: [
      {
        id: 'hse',
        label: 'Strict HSE',
        sublabel: 'Compliance',
        icon: 'shield-check'
      },
      {
        id: 'adnoc',
        label: 'ADNOC / CICPA',
        sublabel: 'Cleared Fleet',
        icon: 'award'
      },
      {
        id: 'desert',
        label: 'Desert-Ready',
        sublabel: 'All-Terrain',
        icon: 'truck'
      },
      {
        id: 'weather',
        label: 'All-Weather',
        sublabel: '24/7 Supply',
        icon: 'droplet'
      }
    ],

    // Key Benefits
    benefitsPhoto: '/images/service-card-storage-exact.jpg',
    benefitsPhotoAlt: 'Industrial petroleum storage tanks and distribution manifold',
    benefitsEyebrow: 'Key Benefits',
    keyBenefits: [
      'High-specification diesel meeting stringent oilfield equipment standards',
      'ADNOC, CICPA, and safety-cleared drivers and all-wheel-drive tanker fleet',
      'Dedicated fuel distribution for exploration rigs and remote field basecamps',
      'Comprehensive HSE safety tracking and on-site spill prevention equipment',
      'Flexible short-term exploratory contracts or multi-year bulk supply agreements'
    ],

    // Applications
    applicationsTitle: 'Applications in Oil & Gas',
    applications: [
      {
        id: 'app-1',
        title: 'Drilling Rigs & Camp Ops',
        desc: 'Continuous heavy fuel supply for rig power plants, mud pumps, and living quarters.',
        icon: 'flame'
      },
      {
        id: 'app-2',
        title: 'Refinery Maintenance',
        desc: 'Surge fuel supply during planned refinery maintenance and shutdown overhauls.',
        icon: 'factory'
      },
      {
        id: 'app-3',
        title: 'Pipeline Infrastructure',
        desc: 'Reliable mobile refuelling along remote pipeline corridors and pump stations.',
        icon: 'activity'
      },
      {
        id: 'app-4',
        title: 'Offshore Supply Bases',
        desc: 'Shore-based bulk diesel storage and supply for offshore mobilization hubs.',
        icon: 'anchor'
      }
    ],

    // Related Services
    relatedTitle: 'Related Services',
    related: ['power-generation', 'marine-shipping', 'manufacturing'],

    // Bottom CTA
    ctaTitle: 'Looking for a Certified Fuel Partner for Your Energy Operations?',
    ctaSubtitle: 'Get a tailored fuel supply solution from Dubai Diesel Trading L.L.C.'
  }
};

// Quick lookup helper for related cards
export const industryCardSummaries = {
  construction: {
    id: 'construction',
    title: 'Construction',
    image: '/images/industry-construction.jpg',
    desc: 'Equipment & on-site generator fueling'
  },
  manufacturing: {
    id: 'manufacturing',
    title: 'Manufacturing',
    image: '/images/industry-manufacturing.jpg',
    desc: 'Industrial boiler & factory plant diesel'
  },
  'logistics-transport': {
    id: 'logistics-transport',
    title: 'Logistics & Transport',
    image: '/images/service-bulk.jpg',
    desc: 'Fleet depot & highway mobile fueling'
  },
  'power-generation': {
    id: 'power-generation',
    title: 'Power Generation',
    image: '/images/service-generator.jpg',
    desc: 'Prime & standby generator supply'
  },
  'marine-shipping': {
    id: 'marine-shipping',
    title: 'Marine & Shipping',
    image: '/images/service-marine.jpg',
    desc: 'Certified MGO bunkering at UAE ports'
  },
  'oil-gas': {
    id: 'oil-gas',
    title: 'Oil & Gas',
    image: '/images/industry-oil-gas.jpg',
    desc: 'Upstream rigs & refinery logistics'
  }
};
