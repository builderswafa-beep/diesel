// src/data/serviceDetails.js
// Complete data for the 6 Service Detail Pages of Dubai Diesel Trading L.L.C.
// Faithfully matches the Diesel Supply / Service Detail reference design.

export const serviceDetails = {
  'diesel-supply': {
    id: 'diesel-supply',
    name: 'Diesel Supply',
    productKey: 'Ultra Low Sulfur Diesel (10ppm)',
    breadcrumbCategory: 'Our Services',
    breadcrumbLink: '/services',
    heroImage: '/images/detail-construction-hero.jpg',
    heroTitle: 'Diesel Supply',
    heroSubtitle: 'High-quality, low-emission diesel (EN 590 10ppm) delivered with unmatched reliability across the UAE.',
    
    // Overview section
    overviewEyebrow: 'OUR SERVICE',
    overviewTitle: 'High-Quality',
    overviewTitleHighlight: 'Diesel Supply',
    overviewDesc: 'We provide premium-grade Ultra Low Sulfur Diesel (EN 590 10ppm) tailored for commercial fleets, construction contractors, manufacturing facilities, and heavy industrial operations. Our dedicated tanker fleet guarantees punctual, safe, and metered delivery directly to your site or storage tanks.',
    overviewImage: '/images/detail-construction-overview.jpg',
    overviewImageAlt: 'Dubai Diesel branded tanker truck delivering diesel fuel on-site',

    // Why Choose & 4 Pillars
    whyChooseTitle: 'Why Choose Our',
    whyChooseTitleHighlight: 'Diesel Supply',
    whyChooseTitleSuffix: 'Solutions?',
    whyChooseDesc: 'Dubai Diesel Trading L.L.C. combines state-of-the-art logistics with strict quality verification. Every liter meets UAE civil defense and international environmental standards, safeguarding your engines and optimizing operational continuity.',
    pillars: [
      {
        id: 'uninterrupted',
        label: 'Uninterrupted',
        sublabel: 'Supply',
        icon: 'droplet'
      },
      {
        id: 'quality',
        label: 'EN 590',
        sublabel: 'Quality',
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
    benefitsPhoto: '/images/services-card-diesel.jpg',
    benefitsPhotoAlt: 'Commercial fleet depot with diesel fuel dispensers and trucks',
    benefitsEyebrow: 'Key Benefits',
    keyBenefits: [
      'Ultra Low Sulfur Diesel (10ppm) adhering to strict EN 590 standards',
      'Water-free and sediment-free fuel guarantee with lab test provenance',
      'Direct-to-tank mobile delivery during scheduled operational or idle hours',
      'Digital calibrated flow meters ensuring 100% transparent invoicing',
      'UAE-wide dispatch coverage across Dubai, Abu Dhabi, Sharjah, and Northern Emirates'
    ],

    // Applications
    applicationsTitle: 'Applications in Diesel Supply',
    applications: [
      {
        id: 'app-1',
        title: 'Commercial Fleets',
        desc: 'Reliable regular fueling for heavy trucks, trailers, buses, and commercial transport vans.',
        icon: 'truck'
      },
      {
        id: 'app-2',
        title: 'Construction Machinery',
        desc: 'On-site refueling for excavators, cranes, wheel loaders, and site equipment.',
        icon: 'excavator'
      },
      {
        id: 'app-3',
        title: 'Prime & Backup Generators',
        desc: 'Clean, low-ash fuel ensuring seamless power continuity for critical infrastructure.',
        icon: 'generator'
      },
      {
        id: 'app-4',
        title: 'Industrial Manufacturing',
        desc: 'Dependable bulk supply keeping industrial plant production running smoothly.',
        icon: 'factory'
      }
    ],

    // Related Services (3 cards)
    relatedTitle: 'Related Services',
    related: ['industrial-fuel', 'generator-fuel', 'bulk-fuel-supply'],

    // Bottom CTA
    ctaTitle: 'Need High-Quality Diesel Delivered to Your Site?',
    ctaSubtitle: 'Get a tailored fuel supply solution from Dubai Diesel Trading L.L.C.'
  },

  'industrial-fuel': {
    id: 'industrial-fuel',
    name: 'Industrial Fuel',
    productKey: 'Industrial Gas Oil',
    breadcrumbCategory: 'Our Services',
    breadcrumbLink: '/services',
    heroImage: '/images/industries-hero-panorama-exact.jpg',
    heroTitle: 'Industrial Fuel',
    heroSubtitle: 'Reliable industrial gas oil and diesel fuel solutions powering manufacturing, asphalt plants, processing facilities, and heavy machinery throughout the UAE.',
    
    // Overview section
    overviewEyebrow: 'OUR SERVICE',
    overviewTitle: 'Fuel Solutions for',
    overviewTitleHighlight: 'Industrial Operations',
    overviewDesc: 'We supply high-caloric industrial fuel and gas oil engineered to maximize combustion efficiency in boilers, kilns, asphalt plants, and heavy fabrication machinery. Our scheduled bulk logistics prevent factory downtime and maintain consistent thermodynamic performance.',
    overviewImage: '/images/service-industrial.jpg',
    overviewImageAlt: 'Industrial manufacturing plant fuel supply by Dubai Diesel',

    // Why Choose & 4 Pillars
    whyChooseTitle: 'Why Choose Our',
    whyChooseTitleHighlight: 'Industrial Fuel',
    whyChooseTitleSuffix: 'Supply?',
    whyChooseDesc: 'Industrial operations operate under rigorous production targets where fuel quality variations damage burners and halt output. Dubai Diesel Trading L.L.C. delivers certified, clean industrial fuel with guaranteed delivery windows.',
    pillars: [
      {
        id: 'thermal',
        label: 'High Thermal',
        sublabel: 'Output',
        icon: 'flame'
      },
      {
        id: 'standards',
        label: 'ADNOC',
        sublabel: 'Compliant',
        icon: 'shield-check'
      },
      {
        id: 'scheduled',
        label: 'Scheduled',
        sublabel: 'Delivery',
        icon: 'truck'
      },
      {
        id: 'advisory',
        label: 'Technical',
        sublabel: 'Advisory',
        icon: 'headset'
      }
    ],

    // Key Benefits
    benefitsPhoto: '/images/industry-manufacturing.jpg',
    benefitsPhotoAlt: 'Modern automated manufacturing factory floor',
    benefitsEyebrow: 'Key Benefits',
    keyBenefits: [
      'High thermal caloric value reducing overall fuel consumption per production cycle',
      'Controlled low-carbon formulation minimizing burner tip maintenance and downtime',
      'Flexible delivery volumes tailored to continuous multi-shift factory operations',
      'Strict environmental compliance with UAE Ministry of Energy guidelines',
      'On-site storage tank inspection and consumption forecasting advisory'
    ],

    // Applications
    applicationsTitle: 'Applications in Industrial Fuel',
    applications: [
      {
        id: 'app-1',
        title: 'Asphalt & Batching Plants',
        desc: 'Continuous high-temperature diesel for asphalt dryers and concrete mixers.',
        icon: 'factory'
      },
      {
        id: 'app-2',
        title: 'Industrial Boilers',
        desc: 'Clean-burning fuel for steam boilers, autoclaves, and thermal fluid heaters.',
        icon: 'flame'
      },
      {
        id: 'app-3',
        title: 'Smelters & Foundries',
        desc: 'Consistent high-heat fuel for metal casting, smelting, and extrusion furnaces.',
        icon: 'cogs'
      },
      {
        id: 'app-4',
        title: 'Plant Material Handlers',
        desc: 'On-site refueling for heavy yard forklifts, reach stackers, and haulers.',
        icon: 'forklift'
      }
    ],

    // Related Services
    relatedTitle: 'Related Services',
    related: ['diesel-supply', 'bulk-fuel-supply', 'storage-distribution'],

    // Bottom CTA
    ctaTitle: 'Looking to Power Your Industrial Facility Without Interruption?',
    ctaSubtitle: 'Get a tailored fuel supply solution from Dubai Diesel Trading L.L.C.'
  },

  'marine-fuel': {
    id: 'marine-fuel',
    name: 'Marine Fuel',
    productKey: 'Marine Gas Oil (MGO)',
    breadcrumbCategory: 'Our Services',
    breadcrumbLink: '/services',
    heroImage: '/images/service-marine.jpg',
    heroTitle: 'Marine Fuel',
    heroSubtitle: 'Certified Marine Gas Oil (DMA/MGO) and bunkering services for commercial shipping, offshore vessels, tugboats, and yachts at major UAE ports and anchorages.',
    
    // Overview section
    overviewEyebrow: 'OUR SERVICE',
    overviewTitle: 'Certified Bunkering &',
    overviewTitleHighlight: 'Marine Fuel Solutions',
    overviewDesc: 'Dubai Diesel Trading L.L.C. delivers premium Marine Gas Oil (MGO) conforming to ISO 8217 specifications. We coordinate flawless Truck-to-Ship (TTS) bunkering at Dubai Maritime City, Port Rashid, Jebel Ali, and anchorage points across the Emirates.',
    overviewImage: '/images/service-card-marine-exact.jpg',
    overviewImageAlt: 'Marine vessel bunkering at UAE maritime terminal',

    // Why Choose & 4 Pillars
    whyChooseTitle: 'Why Choose Our',
    whyChooseTitleHighlight: 'Marine Bunkering',
    whyChooseTitleSuffix: 'Services?',
    whyChooseDesc: 'Maritime operations demand punctual vessel turnarounds, strict MARPOL VI environmental compliance, and verified laboratory documentation. Our team coordinates directly with port masters, customs, and ship engineers.',
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
    benefitsPhoto: '/images/service-marine.jpg',
    benefitsPhotoAlt: 'Container ship underway in ocean with calm blue water',
    benefitsEyebrow: 'Key Benefits',
    keyBenefits: [
      'Certified ISO 8217 DMA specification with strictly controlled sulfur (<0.10% / <0.50%)',
      'Complete Bunker Delivery Notes (BDN) and sealed MARPOL representative samples',
      'Pre-cleared logistics personnel with full port authority and coast guard clearance',
      'High-speed pumping tankers designed to minimize vessel demurrage and idle time',
      'Flexible bunkering options for container ships, offshore supply vessels, and yachts'
    ],

    // Applications
    applicationsTitle: 'Applications in Marine Fuel',
    applications: [
      {
        id: 'app-1',
        title: 'Commercial Cargo Ships',
        desc: 'Compliant MGO bunkering for regional container feeders and general cargo ships.',
        icon: 'ship'
      },
      {
        id: 'app-2',
        title: 'Offshore Support Vessels',
        desc: 'Dedicated bunkering for anchor handlers, supply boats, and crew transfer craft.',
        icon: 'anchor'
      },
      {
        id: 'app-3',
        title: 'Harbor Tugs & Dredgers',
        desc: 'Reliable regular supply for port authority tugs, pilot boats, and channel dredgers.',
        icon: 'compass'
      },
      {
        id: 'app-4',
        title: 'Luxury Commercial Yachts',
        desc: 'Pure, water-free fuel delivery for mega-yachts and commercial passenger charters.',
        icon: 'life-buoy'
      }
    ],

    // Related Services
    relatedTitle: 'Related Services',
    related: ['bulk-fuel-supply', 'storage-distribution', 'diesel-supply'],

    // Bottom CTA
    ctaTitle: 'Require Punctual Marine Bunkering at UAE Ports?',
    ctaSubtitle: 'Get a tailored fuel supply solution from Dubai Diesel Trading L.L.C.'
  },

  'generator-fuel': {
    id: 'generator-fuel',
    name: 'Generator Fuel',
    productKey: 'Ultra Low Sulfur Diesel (10ppm)',
    breadcrumbCategory: 'Our Services',
    breadcrumbLink: '/services',
    heroImage: '/images/service-card-generator-exact.jpg',
    heroTitle: 'Generator Fuel',
    heroSubtitle: 'Mission-critical diesel fuel delivery ensuring 24/7 power continuity for prime, standby, and emergency generators across commercial and industrial facilities.',
    
    // Overview section
    overviewEyebrow: 'OUR SERVICE',
    overviewTitle: 'Uninterrupted Power with',
    overviewTitleHighlight: 'Generator Fuel Supply',
    overviewDesc: 'We specialize in dedicated fuel supply for standby, prime, and emergency diesel generators. Our 24/7 priority dispatch and automatic tank replenishment ensure hospitals, data centers, construction sites, and towers maintain continuous power.',
    overviewImage: '/images/service-generator.jpg',
    overviewImageAlt: 'Industrial diesel generator unit fueled by Dubai Diesel',

    // Why Choose & 4 Pillars
    whyChooseTitle: 'Why Choose Our',
    whyChooseTitleHighlight: 'Generator Fuel',
    whyChooseTitleSuffix: 'Supply?',
    whyChooseDesc: 'Generator dependability depends directly on clean, moisture-free fuel. Dubai Diesel Trading L.L.C. supplies low-ash EN 590 diesel with guaranteed SLA response times during unexpected grid outages.',
    pillars: [
      {
        id: 'sla',
        label: '24/7 Priority',
        sublabel: 'SLA',
        icon: 'clock'
      },
      {
        id: 'quality',
        label: 'Low-Ash',
        sublabel: 'EN 590 Fuel',
        icon: 'shield-check'
      },
      {
        id: 'telemetry',
        label: 'Automated',
        sublabel: 'Top-Ups',
        icon: 'activity'
      },
      {
        id: 'dispatch',
        label: 'Rapid Emergency',
        sublabel: 'Dispatch',
        icon: 'truck'
      }
    ],

    // Key Benefits
    benefitsPhoto: '/images/services-card-generator.jpg',
    benefitsPhotoAlt: 'Commercial standby generator plant and soundproof enclosures',
    benefitsEyebrow: 'Key Benefits',
    keyBenefits: [
      'Ultra-low sulfur 10ppm diesel formulated for generator longevity and low emissions',
      'Zero moisture contamination preventing fuel pump cavitation and injector clogging',
      '24/7 priority emergency dispatch during grid failures and critical power events',
      'Automated tank telemetry and scheduled top-ups avoiding sudden fuel depletion',
      'Supply contracts tailored for temporary project power or permanent facility standby'
    ],

    // Applications
    applicationsTitle: 'Applications in Generator Fuel',
    applications: [
      {
        id: 'app-1',
        title: 'Hospitals & Data Centers',
        desc: 'Mission-critical standby reserves for life support, IT servers, and banks.',
        icon: 'hospital'
      },
      {
        id: 'app-2',
        title: 'Construction Site Grids',
        desc: 'Continuous power generation for tower cranes, hoists, and temporary lighting.',
        icon: 'excavator'
      },
      {
        id: 'app-3',
        title: 'Major Outdoor Events',
        desc: 'Silent generator fueling for exhibitions, film sets, concerts, and festivals.',
        icon: 'calendar'
      },
      {
        id: 'app-4',
        title: 'Remote Off-Grid Camps',
        desc: 'High-reliability prime power supply for desert camps and isolated facilities.',
        icon: 'sun'
      }
    ],

    // Related Services
    relatedTitle: 'Related Services',
    related: ['diesel-supply', 'bulk-fuel-supply', 'industrial-fuel'],

    // Bottom CTA
    ctaTitle: 'Ensure 100% Power Continuity for Your Generator Sets',
    ctaSubtitle: 'Get a tailored fuel supply solution from Dubai Diesel Trading L.L.C.'
  },

  'bulk-fuel-supply': {
    id: 'bulk-fuel-supply',
    name: 'Bulk Fuel Supply',
    productKey: 'Bulk Fuel Supply',
    breadcrumbCategory: 'Our Services',
    breadcrumbLink: '/services',
    heroImage: '/images/services-hero-tanker.jpg',
    heroTitle: 'Bulk Fuel Supply',
    heroSubtitle: 'Large-scale commercial fuel deliveries tailored to transport fleets, mega-construction developments, and industrial storage depots across the UAE.',
    
    // Overview section
    overviewEyebrow: 'OUR SERVICE',
    overviewTitle: 'Large-Scale Commercial',
    overviewTitleHighlight: 'Bulk Fuel Supply',
    overviewDesc: 'Dubai Diesel Trading L.L.C. operates a modern, certified fleet of high-capacity road tankers delivering volume consignments from 5,000 to over 50,000 Imperial Gallons. We provide tiered wholesale volume pricing, scheduled dispatch, and calibrated flow meters.',
    overviewImage: '/images/service-bulk.jpg',
    overviewImageAlt: 'Dubai Diesel bulk road tanker on highway',

    // Why Choose & 4 Pillars
    whyChooseTitle: 'Why Choose Our',
    whyChooseTitleHighlight: 'Bulk Fuel Logistics',
    whyChooseTitleSuffix: 'Solutions?',
    whyChooseDesc: 'Procuring fuel in bulk requires supplier financial strength, safety certifications, and flawless delivery timing. We guarantee consistent product quality, digital batch tickets, and competitive wholesale contracts.',
    pillars: [
      {
        id: 'fleet',
        label: 'High-Capacity',
        sublabel: 'Fleet',
        icon: 'truck'
      },
      {
        id: 'meters',
        label: 'Calibrated',
        sublabel: 'Meters',
        icon: 'activity'
      },
      {
        id: 'rates',
        label: 'Wholesale',
        sublabel: 'Volume Rates',
        icon: 'tag'
      },
      {
        id: 'coverage',
        label: 'UAE-Wide',
        sublabel: 'Coverage',
        icon: 'compass'
      }
    ],

    // Key Benefits
    benefitsPhoto: '/images/services-card-bulk.jpg',
    benefitsPhotoAlt: 'High-capacity road tanker loading at fuel terminal gantry',
    benefitsEyebrow: 'Key Benefits',
    keyBenefits: [
      'Modern ADR and Civil Defense certified road tankers with high discharge rates',
      'Calibrated digital flow meters providing tamper-proof delivery volume tickets',
      'Competitive volume discount structures protecting against fuel market volatility',
      'Dedicated dispatch team with GPS route tracking and arrival notifications',
      'Direct discharge into above-ground skid tanks, underground reservoirs, or holding units'
    ],

    // Applications
    applicationsTitle: 'Applications in Bulk Fuel Supply',
    applications: [
      {
        id: 'app-1',
        title: 'Logistics & Freight Hubs',
        desc: 'Bulk fueling for regional distribution centers, trucking fleets, and depots.',
        icon: 'truck'
      },
      {
        id: 'app-2',
        title: 'Mega Infrastructure Works',
        desc: 'Large-volume daily drops for highway projects, airports, and metro extensions.',
        icon: 'crane'
      },
      {
        id: 'app-3',
        title: 'Industrial Holding Depots',
        desc: 'Scheduled replenishment for manufacturing plants and commercial holding tanks.',
        icon: 'warehouse'
      },
      {
        id: 'app-4',
        title: 'Government & Municipal Fleets',
        desc: 'Reliable volume contracts for utility vehicles, public transit, and waste fleets.',
        icon: 'factory'
      }
    ],

    // Related Services
    relatedTitle: 'Related Services',
    related: ['diesel-supply', 'storage-distribution', 'industrial-fuel'],

    // Bottom CTA
    ctaTitle: 'Looking to Optimize Bulk Fuel Procurement for Your Enterprise?',
    ctaSubtitle: 'Get a tailored fuel supply solution from Dubai Diesel Trading L.L.C.'
  },

  'storage-distribution': {
    id: 'storage-distribution',
    name: 'Fuel Storage & Distribution',
    productKey: 'Bulk Fuel Supply',
    breadcrumbCategory: 'Our Services',
    breadcrumbLink: '/services',
    heroImage: '/images/industries-hero-refinery.jpg',
    heroTitle: 'Fuel Storage & Distribution',
    heroSubtitle: 'Safe, Civil Defense-compliant fuel storage systems, double-walled mobile skid tanks, and automated inventory distribution across the UAE.',
    
    // Overview section
    overviewEyebrow: 'OUR SERVICE',
    overviewTitle: 'Safe, Compliant Fuel',
    overviewTitleHighlight: 'Storage & Distribution',
    overviewDesc: 'We provide turnkey on-site fuel storage solutions, including certified double-walled skid tanks, automated dispensing pumps, and real-time inventory telemetry. We manage the entire storage lifecycle, ensuring complete regulatory compliance and non-stop fuel access.',
    overviewImage: '/images/service-card-storage-exact.jpg',
    overviewImageAlt: 'Petroleum storage tanks and distribution manifold',

    // Why Choose & 4 Pillars
    whyChooseTitle: 'Why Choose Our',
    whyChooseTitleHighlight: 'Storage & Distribution',
    whyChooseTitleSuffix: 'Systems?',
    whyChooseDesc: 'On-site storage insulates your operations from delivery lead times and market price fluctuations. Our bunded tanks meet all UAE Civil Defense requirements and prevent spills, theft, and environmental liability.',
    pillars: [
      {
        id: 'bunded',
        label: 'Bunded Skid',
        sublabel: 'Tanks',
        icon: 'shield-check'
      },
      {
        id: 'telemetry',
        label: 'Telemetry',
        sublabel: 'Monitoring',
        icon: 'activity'
      },
      {
        id: 'civil',
        label: 'Civil Defense',
        sublabel: 'Approved',
        icon: 'award'
      },
      {
        id: 'refills',
        label: 'Automated',
        sublabel: 'Refills',
        icon: 'droplet'
      }
    ],

    // Key Benefits
    benefitsPhoto: '/images/about-bento-tank.jpg',
    benefitsPhotoAlt: 'Industrial petroleum storage tanks facility',
    benefitsEyebrow: 'Key Benefits',
    keyBenefits: [
      'Certified double-walled (bunded) mobile skid tanks meeting UAE Civil Defense standards',
      'Integrated digital dispensing pumps, automatic shut-off nozzles, and filtration units',
      'Smart IoT level sensors enabling automated replenishment triggers before tanks run low',
      'Turnkey installation, safety commissioning, and periodic preventive maintenance',
      '100% secondary containment preventing accidental soil or water contamination'
    ],

    // Applications
    applicationsTitle: 'Applications in Storage & Distribution',
    applications: [
      {
        id: 'app-1',
        title: 'On-Site Contractor Depots',
        desc: 'Safe temporary fuel storage for remote construction and earthworks projects.',
        icon: 'excavator'
      },
      {
        id: 'app-2',
        title: 'Manufacturing Holding Tanks',
        desc: 'High-capacity fuel reservoirs for continuous factory and boiler operation.',
        icon: 'factory'
      },
      {
        id: 'app-3',
        title: 'Commercial Fleet Depots',
        desc: 'Turnkey yard dispensing islands with automated driver authorization keys.',
        icon: 'truck'
      },
      {
        id: 'app-4',
        title: 'Remote Energy Operations',
        desc: 'Skid-mounted fuel containment systems for onshore energy and drilling camps.',
        icon: 'flame'
      }
    ],

    // Related Services
    relatedTitle: 'Related Services',
    related: ['bulk-fuel-supply', 'diesel-supply', 'industrial-fuel'],

    // Bottom CTA
    ctaTitle: 'Need an On-Site Fuel Storage Solution for Your Project?',
    ctaSubtitle: 'Get a tailored fuel supply solution from Dubai Diesel Trading L.L.C.'
  }
};

// Aliases for alternate route slugs
serviceDetails['bulk-fuel'] = serviceDetails['bulk-fuel-supply'];
serviceDetails['fuel-storage-distribution'] = serviceDetails['storage-distribution'];

// Quick lookup helper for related cards
export const serviceCardSummaries = {
  'diesel-supply': {
    id: 'diesel-supply',
    title: 'Diesel Supply',
    image: '/images/service-card-diesel-exact.jpg',
    desc: 'High-quality diesel (EN 590) for commercial and industrial use'
  },
  'industrial-fuel': {
    id: 'industrial-fuel',
    title: 'Industrial Fuel',
    image: '/images/service-card-industrial-exact.jpg',
    desc: 'Reliable fuel supply for industrial operations and heavy equipment'
  },
  'marine-fuel': {
    id: 'marine-fuel',
    title: 'Marine Fuel',
    image: '/images/service-card-marine-exact.jpg',
    desc: 'Fuel solutions for marine and shipping operations'
  },
  'generator-fuel': {
    id: 'generator-fuel',
    title: 'Generator Fuel',
    image: '/images/service-card-generator-exact.jpg',
    desc: 'Dependable fuel for power generation and backup systems'
  },
  'bulk-fuel-supply': {
    id: 'bulk-fuel-supply',
    title: 'Bulk Fuel Supply',
    image: '/images/service-card-bulk-exact.jpg',
    desc: 'Large-volume, on-time delivery across the UAE'
  },
  'storage-distribution': {
    id: 'storage-distribution',
    title: 'Fuel Storage & Distribution',
    image: '/images/service-card-storage-exact.jpg',
    desc: 'Safe and efficient storage and distribution solutions'
  }
};

serviceCardSummaries['bulk-fuel'] = serviceCardSummaries['bulk-fuel-supply'];
serviceCardSummaries['fuel-storage-distribution'] = serviceCardSummaries['storage-distribution'];
