import { supabase } from '../supabase';

const BASIC_CATALOG = [
  // Men's Collection (4 Items)
  {
    id: 'e0d7c0e5-7b5a-4f9e-8c3d-2a1b0f6e9d4a',
    name: "Oversized Pump Cover - Pitch Black",
    description: 'The ultimate gym essential. Heavyweight cotton, dropped shoulders, and a boxy fit for that perfect pump cover verification.',
    price: 999,
    original_price: 1499,
    gender: 'men',
    category: 'tshirts',
    brand: 'MUSCFIT',
    tag: 'TRENDING',
    is_active: true,
    rating: 4.8,
    review_count: 124,
    image_url: '/assets/images/products/mens_black_tshirt_basic.png',
  },
  {
    id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    name: "Acid Wash Oversized Tee - Graphite",
    description: 'Vintage-inspired acid wash finish. Premium heavy blend cotton for superior comfort and durability during heavy lifts.',
    price: 999,
    original_price: 1499,
    gender: 'men',
    category: 'tshirts',
    brand: 'MUSCFIT',
    tag: 'NEW',
    is_active: true,
    rating: 4.7,
    review_count: 89,
    image_url: '/assets/images/products/mens_grey_tshirt_basic.png',
  },
  {
    id: 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
    name: "Men's Elite T-Shirt (White)",
    description: 'Aura white performance tee. Crisp, clean, and unbranded.',
    price: 999,
    original_price: 1499,
    gender: 'men',
    category: 'tshirts',
    brand: 'MUSCFIT',
    tag: 'NEW',
    is_active: true,
    rating: 4.9,
    review_count: 142,
    image_url: '/assets/images/products/plain_white_tshirt_flat_lay_1767417660339.png',
  },
  {
    id: 'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
    name: "Tech-Fleece Tapered Joggers - Black",
    description: 'Engineered for mobility. Tapered fit with thermal tech-fleece lining to keep muscles warm during rest periods.',
    price: 1899,
    original_price: 2499,
    gender: 'men',
    category: 'joggers',
    brand: 'MUSCFIT',
    tag: 'BESTSELLER',
    is_active: true,
    rating: 4.9,
    review_count: 256,
    image_url: '/assets/images/products/mens_black_joggers_basic.png',
  },

  // Women's Collection (4 Items)
  {
    id: 'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a',
    name: "MuscFIT Signature Leggings - Black",
    description: 'The icon. High-waisted seamless leggings featuring our signature bold branding. Squat-proof, sculpting, and engineered for performance.',
    price: 1599,
    original_price: 2199,
    gender: 'women',
    category: 'joggers',
    brand: 'MUSCFIT',
    tag: 'HOT',
    is_active: true,
    rating: 4.9,
    review_count: 342,
    image_url: '/assets/images/products/muscfit_branded_leggings.png',
  },
  {
    id: 'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b',
    name: "Women's Performance Leggings (Grey)",
    description: 'Heather grey performance leggings. Sleek design, zero branding.',
    price: 1599,
    original_price: 2199,
    gender: 'women',
    category: 'joggers',
    brand: 'MUSCFIT',
    tag: 'NEW',
    is_active: true,
    rating: 4.8,
    review_count: 156,
    image_url: '/assets/images/products/womens_grey_leggings_basic.png',
  },
  {
    id: 'f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c',
    name: "Women's Performance Leggings (White)",
    description: 'Aura white performance leggings. Crisp, clean, and unbranded.',
    price: 1599,
    original_price: 2199,
    gender: 'women',
    category: 'joggers',
    brand: 'MUSCFIT',
    tag: 'NEW',
    is_active: true,
    rating: 4.9,
    review_count: 88,
    image_url: '/assets/images/products/plain_white_tshirt_flat_lay_1767417660339.png', // Placeholder (unbranded tee for white)
  },
  {
    id: 'a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d',
    name: "Women's Core Shorts (Black)",
    description: 'Solid black training shorts. High-waist, high-performance.',
    price: 1299,
    original_price: 1799,
    gender: 'women',
    category: 'shorts', // Corrected to shorts as well while at it? No, wait.
    brand: 'MUSCFIT',
    tag: 'NEW',
    is_active: true,
    rating: 4.7,
    review_count: 54,
    image_url: '/assets/images/products/plain_black_shorts_flat_lay_1767418127534.png',
  },

  // Compression Series (4 Items)
  {
    id: 'b8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e',
    name: 'Pro-Grade Thermal Compression Top - Black',
    description: 'Second-skin fit that increases blood flow and reduces recovery time. Essential base layer for high-performance athletes.',
    price: 1299,
    original_price: 1999,
    gender: 'compression',
    category: 'tshirts',
    brand: 'MUSCFIT',
    tag: 'PRO',
    is_active: true,
    rating: 4.9,
    review_count: 212,
    image_url: '/assets/images/products/plain_black_tshirt_flat_lay_2_1767417716871.png',
  },
  {
    id: 'c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f',
    name: 'Elite Compression Shirt (White)',
    description: 'Advanced white compression base layer. Thermal regulation technology.',
    price: 1299,
    original_price: 1999,
    gender: 'compression',
    category: 'tshirts',
    brand: 'MUSCFIT',
    tag: 'NEW',
    is_active: true,
    rating: 4.8,
    review_count: 98,
    image_url: '/assets/images/products/plain_white_tshirt_flat_lay_1767417660339.png',
  },
  {
    id: 'd0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a',
    name: 'Elite Compression Shirt (Grey)',
    description: 'Technical grey compression top. Unbranded, professional fit.',
    price: 1299,
    original_price: 1999,
    gender: 'compression',
    category: 'tshirts',
    brand: 'MUSCFIT',
    tag: 'NEW',
    is_active: true,
    rating: 4.7,
    review_count: 65,
    image_url: '/assets/images/products/mens_grey_tshirt_basic.png',
  },
  {
    id: 'e1f2a3b4-c5d6-4e7f-8a9b-0c1d2e3f4a5b',
    name: 'Aero-Tech Compression Tee (Black)',
    description: 'Breathable black compression tee for high-intensity training.',
    price: 1399,
    original_price: 1899,
    gender: 'compression',
    category: 'tshirts',
    brand: 'MUSCFIT',
    tag: 'NEW',
    is_active: true,
    rating: 4.8,
    review_count: 112,
    image_url: '/assets/images/products/mens_black_tshirt_basic.png',
  },
  // GEMINI GENERATED COMPRESSION PRODUCTS
  {
    id: 'f2a3b4c5-d6e7-4f8a-9b0c-1d2e3f4a5b6c',
    name: "Hyper-Flex Compression Long Sleeve - Midnight",
    description: "Advanced moisture-wicking compression top with targeted support zones for upper body stability. Features 4-way stretch Hydro-Cool fabric.",
    price: 1499,
    original_price: 2299,
    gender: 'compression',
    category: 'tshirts',
    brand: 'MUSCFIT',
    tag: 'PRO',
    is_active: true,
    rating: 4.9,
    review_count: 15,
    image_url: '/assets/images/products/plain_black_tshirt_flat_lay_2_1767417716871.png', // Placeholder
  },
  {
    id: 'a3b4c5d6-e7f8-4a9b-0c1d-2e3f4a5b6c7d',
    name: "Recovery Pro Gradient Tights - Onyx",
    description: "Medical-grade gradient compression engineered to accelerate muscle recovery and reduce lactic acid buildup post-workout.",
    price: 1899,
    original_price: 2599,
    gender: 'compression',
    category: 'joggers', // Tights map to joggers logic in this DB based on prior women's mapping
    brand: 'MUSCFIT',
    tag: 'RECOVERY',
    is_active: true,
    rating: 4.8,
    review_count: 28,
    image_url: '/assets/images/products/mens_black_joggers_basic.png', // Placeholder
  },
  {
    id: 'b4c5d6e7-f8a9-4b0c-1d2e-3f4a5b6c7d8e',
    name: "Core Stabilizer Tank - Graphite",
    description: "Sleeveless compression baselayer designed for maximum core engagement and breathability during heavy compound lifts.",
    price: 999,
    original_price: 1499,
    gender: 'compression',
    category: 'tshirts',
    brand: 'MUSCFIT',
    tag: 'BESTSELLER',
    is_active: true,
    rating: 4.7,
    review_count: 42,
    image_url: '/assets/images/products/mens_grey_tshirt_basic.png', // Placeholder
  },
  {
    id: 'c5d6e7f8-a9b0-4c1d-2e3f-4a5b6c7d8e9f',
    name: "Sculpt-X Compression Set - Mocha",
    description: "Premium full-coverage compression set featuring high-waisted shorts and long-sleeve crop top. Engineered for contouring and maximum flexibility.",
    price: 3499,
    original_price: 4999,
    gender: 'compression',
    category: 'compression_wear',
    brand: 'MUSCFIT',
    tag: 'NEW',
    is_active: true,
    rating: 5.0,
    review_count: 4,
    image_url: '/assets/images/products/compression_set_brown.png',
  },

  // Accessories (4 Items)
  {
    id: 'a-bb-b-1',
    name: 'MuscFIT Tactical Gym Bag (45L) - Blackout',
    description: 'Military-grade durability. Wet/dry separation pocket, dedicated shoe compartment, and Molle webbing system.',
    price: 2499,
    original_price: 3499,
    gender: 'unisex',
    category: 'accessories',
    brand: 'MUSCFIT',
    tag: 'TACTICAL',
    is_active: true,
    rating: 4.7,
    review_count: 92,
    image_url: '/assets/images/products/muscfit_duffel.jpg',
  },
  {
    id: 'a-wb-b-2',
    name: 'MuscFIT Tactical Gym Bag (45L) - Arctic White',
    description: 'Minimalist white training bag. Water-resistant material.',
    price: 2499,
    original_price: 3499,
    gender: 'unisex',
    category: 'accessories',
    brand: 'MUSCFIT',
    tag: 'NEW',
    is_active: true,
    rating: 4.8,
    review_count: 42,
    image_url: '/assets/images/products/muscfit_duffel.jpg', // Placeholder reusing duffel
  },
  {
    id: 'a-gb-t-3',
    name: 'MuscFIT Pro Lever Belt (10mm)',
    description: 'Competition grade leather belt with quick-release lever mechanism for maximum intra-abdominal pressure.',
    price: 1599,
    original_price: 2199,
    gender: 'unisex',
    category: 'accessories',
    brand: 'MUSCFIT',
    tag: 'POWER',
    is_active: true,
    rating: 4.9,
    review_count: 156,
    image_url: '/assets/images/accessory-gloves.jpg', // Placeholder reusing gloves
  },
  {
    id: 'a-bb-w-4',
    name: 'MuscFIT Heavy Duty Wrist Wraps',
    description: 'Maximum stability for heavy pressing movements. Bench press approved with reinforced thumb loops.',
    price: 799,
    original_price: 1199,
    gender: 'unisex',
    category: 'accessories',
    brand: 'MUSCFIT',
    tag: 'ESSENTIAL',
    is_active: true,
    rating: 4.8,
    review_count: 234,
    image_url: '/assets/images/accessory-gloves.jpg',
  },

  // --- MIGRATED FROM HOMEPAGE ---
  // Winter Arc Collection
  {
    id: 'wa-h-1',
    name: 'MuscFIT Winter Arc Hoodie (Blue)',
    description: 'Premium heavyweight hoodie for the winter arc. Fleece-lined for warmth.',
    price: 1599,
    original_price: 2499,
    gender: 'men',
    category: 'winter-arc',
    brand: 'MUSCFIT',
    tag: 'limited',
    is_active: true,
    rating: 4.9,
    review_count: 42,
    image_url: '/assets/images/products/winter-arc-hoodie-blue.png',
  },
  {
    id: 'wa-p-1',
    name: 'MuscFIT Winter Arc Joggers (Blue)',
    description: 'Matching thermal pants for the ultimate winter training set.',
    price: 1599,
    original_price: 2299,
    gender: 'men',
    category: 'winter-arc',
    brand: 'MUSCFIT',
    tag: 'limited',
    is_active: true,
    rating: 4.8,
    review_count: 36,
    image_url: '/assets/images/products/winter-arc-pants-blue.jpg',
  },
  {
    id: 'wa-h-2',
    name: 'MuscFIT Winter Arc Hoodie (Black)',
    description: 'The classic black heavyweight hoodie. Essential for cold starts.',
    price: 1599,
    original_price: 2499,
    gender: 'men',
    category: 'winter-arc',
    brand: 'MUSCFIT',
    tag: 'limited',
    is_active: true,
    rating: 5.0,
    review_count: 58,
    image_url: '/assets/images/products/winter-arc-hoodie-black.png',
  },
  {
    id: 'wa-b-1',
    name: 'MuscFIT Winter Beanie & Glove Set',
    description: 'Complete winter accessories including beanie and gloves.',
    price: 1299,
    original_price: 1899,
    gender: 'unisex',
    category: 'winter-arc',
    brand: 'MUSCFIT',
    tag: 'bundle',
    is_active: true,
    rating: 4.7,
    review_count: 24,
    image_url: '/assets/images/products/winter-arc-beanie.png',
  },

  // Men's Specific
  {
    id: 'men-shop-1',
    name: 'MuscFIT Compression Training Shirt - Charcoal',
    description: 'Advanced compression technology for maximum muscle support.',
    price: 1499,
    original_price: 1999,
    gender: 'men',
    category: 'tshirts',
    brand: 'MUSCFIT',
    tag: 'featured',
    is_active: true,
    rating: 4.6,
    review_count: 89,
    image_url: '/assets/images/men-shop-1.jpg',
  },
  {
    id: 'men-shop-2',
    name: 'MuscFIT Graphic Performance Shorts',
    description: 'Lightweight shorts with bold graphic design for statement training.',
    price: 1199,
    original_price: 1599,
    gender: 'men',
    category: 'shorts',
    brand: 'MUSCFIT',
    tag: 'featured',
    is_active: true,
    rating: 4.8,
    review_count: 112,
    image_url: '/assets/images/men-shop-2.png',
  },

  // Women's Specific
  {
    id: 'women-shop-1',
    name: 'MuscFIT Performance Long Sleeve',
    description: 'Breathable long sleeve top in energetic pink. Moisture-wicking.',
    price: 1299,
    original_price: 1799,
    gender: 'women',
    category: 'tshirts',
    brand: 'MUSCFIT',
    tag: 'featured',
    is_active: true,
    rating: 4.9,
    review_count: 145,
    image_url: '/assets/images/women-shop-1.jpg',
  },
  {
    id: 'women-shop-2',
    name: 'MuscFIT Seamless Crop Top',
    description: 'Seamless construction for zero chafing. Perfect crop fit.',
    price: 999,
    original_price: 1499,
    gender: 'women',
    category: 'tshirts',
    brand: 'MUSCFIT',
    tag: 'featured',
    is_active: true,
    rating: 4.7,
    review_count: 98,
    image_url: '/assets/images/women-shop-2.jpg',
  },
  {
    id: 'women-shop-3',
    name: 'MuscFIT Lounge Hoodie Set',
    description: 'Cozy brown hoodie set for rest days and recovery.',
    price: 2499,
    original_price: 3499,
    gender: 'women',
    category: 'leggings', // Mapped to existing cats or allow new 'sets'
    brand: 'MUSCFIT',
    tag: 'featured',
    is_active: true,
    rating: 4.8,
    review_count: 67,
    image_url: '/assets/images/women-shop-3.png',
  },

  // Compression Featured

  {
    id: 'compression-2',
    name: 'MuscFIT Pro Base Layer - Olive',
    description: 'Tactical olive base layer for serious athletes.',
    price: 1799,
    original_price: 2299,
    gender: 'compression',
    category: 'tshirts',
    brand: 'MUSCFIT',
    tag: 'featured',
    is_active: true,
    rating: 4.8,
    review_count: 88,
    image_url: '/assets/images/compression-2.png',
  },

  // Accessories Expanded
  {
    id: 'acc-1',
    name: 'MuscFIT Ultimate Gym Bag',
    description: 'Large capacity duffel for all your gear.',
    price: 2499,
    original_price: 3999,
    gender: 'unisex',
    category: 'gym-bags',
    brand: 'MUSCFIT',
    tag: 'featured-acc',
    is_active: true,
    rating: 4.9,
    review_count: 210,
    image_url: '/assets/images/products/muscfit_duffel.jpg',
  },
  {
    id: 'acc-2',
    name: 'PREMIUM SHAKER BOTTLE',
    description: 'Leak-proof premium shaker.',
    price: 899,
    original_price: 1299,
    gender: 'unisex',
    category: 'accessories',
    brand: 'MUSCFIT',
    tag: 'featured-acc',
    is_active: true,
    rating: 4.6,
    review_count: 450,
    image_url: '/assets/images/products/premium_shaker.png',
  },
  {
    id: 'acc-new-1',
    name: 'WHEY PROTEIN ISOLATE',
    description: 'Pure isolate protein for maximum absorption.',
    price: 2999,
    original_price: 3599,
    gender: 'unisex',
    category: 'supplements',
    brand: 'MUSCFIT',
    tag: 'featured-acc',
    is_active: true,
    rating: 4.8,
    review_count: 500,
    image_url: '/assets/images/accessory-protein.jpg',
  },
  {
    id: 'acc-new-2',
    name: 'PROFESSIONAL POWER RACK',
    description: 'Identify your true strength with our pro rack.',
    price: 24999,
    original_price: 29999,
    gender: 'unisex',
    category: 'equipment',
    brand: 'MUSCFIT',
    tag: 'featured-acc',
    is_active: true,
    rating: 5.0,
    review_count: 12,
    image_url: '/assets/images/accessory-rack.png',
  },
  {
    id: 'acc-new-3',
    name: 'GRIP PRO GLOVES',
    description: 'Enhanced grip technology.',
    price: 899,
    original_price: 1199,
    gender: 'unisex',
    category: 'equipment',
    brand: 'MUSCFIT',
    tag: 'featured-acc',
    is_active: true,
    rating: 4.7,
    review_count: 89,
    image_url: '/assets/images/accessory-gloves.jpg',
  },
  {
    id: 'acc-3',
    name: 'DUMBBELL STORAGE RACK',
    description: 'Organize your weights efficiently.',
    price: 5999,
    original_price: 7999,
    gender: 'unisex',
    category: 'equipment',
    brand: 'MUSCFIT',
    tag: 'featured-acc',
    is_active: true,
    rating: 4.8,
    review_count: 45,
    image_url: '/assets/images/products/dumbbell_rack.png',
  },
  {
    id: 'acc-4',
    name: 'WEIGHT PLATE RACK',
    description: 'Heavy duty plate storage.',
    price: 3499,
    original_price: 4999,
    gender: 'unisex',
    category: 'equipment',
    brand: 'MUSCFIT',
    tag: 'featured-acc',
    is_active: true,
    rating: 4.9,
    review_count: 34,
    image_url: '/assets/images/products/plate_rack.png',
  },
  {
    id: 'acc-s-1',
    name: 'WHEY PROTEIN - VANILLA',
    description: 'Classic vanilla flavor.',
    price: 2499,
    original_price: 3299,
    gender: 'unisex',
    category: 'supplements',
    brand: 'MUSCFIT',
    tag: 'featured',
    is_active: true,
    rating: 4.8,
    review_count: 156,
    image_url: '/assets/images/supplements-featured.png',
  },
  {
    id: 'acc-s-2',
    name: 'PRE-WORKOUT ENERGY',
    description: 'Explosive energy for your best workouts.',
    price: 1899,
    original_price: 2499,
    gender: 'unisex',
    category: 'supplements',
    brand: 'MUSCFIT',
    tag: 'featured',
    is_active: true,
    rating: 4.9,
    review_count: 230,
    image_url: '/assets/images/supplements-featured.png',
  },
];

// Discontinued products to filter out from all views
const DENIED_IDS = ['compression-1', 'veld-track-compression-suit', 'full-body-compression', 'calf-sleeves', 'full-length-tights', 'arm-sleeves'];
const DENIED_NAMES = ['VELD', 'TRACK', 'COMPRESSION FULL SUIT', 'FULL BODY', 'CALF SLEEVES', 'FULL LENGTH', 'TIGHTS', 'ARM SLEEVES', 'SLEEVES']; // Aggressive filtering


export const productService = {
  // Get all products with optional filters
  async getAll(filters = {}) {
    // Clone filters to avoid mutation side effects and implement smart keywords
    const activeFilters = { ...filters };

    if (activeFilters.search) {
      let term = activeFilters.search.toLowerCase().trim();

      // 1. Advanced NLP & Tokenization
      const synonyms = {
        'tee': 'tshirt',
        't-shirt': 'tshirt',
        'shirt': 'tshirt',
        'joggers': 'pants',
        'track': 'pants',
        'bottoms': 'pants',
        'leggings': 'tights',
        'bag': 'accessories',
        'duffel': 'accessories',
        'backpack': 'accessories',
        'supplements': 'nutrition',
        'protein': 'nutrition',
        'whey': 'nutrition',
        'wrist': 'straps',
        'belt': 'gear'
      };

      // Extract Filters from Natural Language
      const genderMap = {
        'men': 'men', 'mens': 'men', 'male': 'men', 'man': 'men',
        'women': 'women', 'womens': 'women', 'female': 'women', 'woman': 'women',
        'compression': 'compression'
      };

      const categoryKeywords = {
        'bag': ['accessories', 'gym-bags'],
        'duffel': ['accessories', 'gym-bags'],
        'equipment': ['accessories', 'equipment'],
        'supplement': ['accessories', 'supplements'],
        'protein': ['accessories', 'supplements'],
        'nutrition': ['accessories', 'supplements'],
        'hoodie': ['hoodies', 'winter-arc'],
        'jacket': ['hoodies', 'winter-arc'],
        'jogger': ['joggers', 'winter-arc'],
        'legging': ['leggings']
      };

      // Tokenize
      let tokens = term.split(/\s+/);
      const cleanedTokens = [];

      tokens.forEach(t => {
        const lowerT = t.toLowerCase().replace(/s$/, ''); // Remove simple plurals

        // Check Gender
        if (genderMap[lowerT] || genderMap[t.toLowerCase()]) {
          activeFilters.gender = genderMap[lowerT] || genderMap[t.toLowerCase()];
          return; // Consumed
        }

        // Check Category triggers
        for (const [key, cats] of Object.entries(categoryKeywords)) {
          if (lowerT.includes(key)) {
            activeFilters.categories = Array.from(new Set([...(activeFilters.categories || []), ...cats]));
            // Don't consume entirely, might be part of name (e.g. "Hoodie")
          }
        }

        cleanedTokens.push(t);
      });

      // Update search term with cleaned tokens for fuzzy matching
      // We keep the generic words for the text search score but use the filters for hard exclusion
      if (cleanedTokens.length === 0 && activeFilters.gender) {
        delete activeFilters.search; // Pure filter
      } else {
        activeFilters.search = cleanedTokens.join(' ');
      }
    }

    let dbProducts = [];
    try {
      if (supabase) {
        let query = supabase
          .from('products')
          .select(
            `
            *,
            product_images(
              id,
              image_url,
              alt_text,
              is_primary
            ),
            product_variants(
              id,
              size,
              color,
              stock_quantity
            ),
            product_attributes(
              id,
              attribute_name,
              attribute_value
            )
          `
          )
          .eq('is_active', true);

        // Apply filters
        if (activeFilters?.gender) {
          query = query.eq('gender', activeFilters?.gender);
        }
        if (activeFilters?.category) {
          query = query.eq('category', activeFilters?.category);
        }
        if (activeFilters?.categories) {
          query = query.in('category', activeFilters?.categories);
        }
        if (activeFilters?.brand) {
          query = query.eq('brand', activeFilters?.brand);
        }
        if (activeFilters?.tag) {
          query = query.eq('tag', activeFilters?.tag);
        }
        if (activeFilters?.minPrice) {
          query = query.gte('price', activeFilters?.minPrice);
        }
        if (activeFilters?.maxPrice) {
          query = query.lte('price', activeFilters?.maxPrice);
        }

        // Apply search
        if (activeFilters?.search) {
          query = query.or(
            `name.ilike.%${activeFilters?.search}%,description.ilike.%${activeFilters?.search}%,brand.ilike.%${activeFilters?.search}%`
          );
        }

        // Apply sorting
        if (activeFilters?.sortBy) {
          const sortOptions = {
            'price-asc': { column: 'price', ascending: true },
            'price-desc': { column: 'price', ascending: false },
            'name-asc': { column: 'name', ascending: true },
            'name-desc': { column: 'name', ascending: false },
            rating: { column: 'rating', ascending: false },
            newest: { column: 'created_at', ascending: false },
          };
          const sort = sortOptions?.[activeFilters?.sortBy];
          if (sort) {
            query = query.order(sort?.column, { ascending: sort?.ascending });
          }
        }

        const { data, error } = await query;
        if (error) throw error;

        if (data) {
          dbProducts = data.map((product) => this.convertToCamelCase(product));
        }
      }
    } catch (error) {
      console.warn('Error fetching products from DB (using fallback):', error);
      // Do not throw, allow fallback to basic catalog
    }

    try {
      // Merge with hardcoded basic catalog
      let mergedProducts = [...dbProducts];

      // Format basic catalog to match the expected structure
      const formattedBasics = BASIC_CATALOG.map((item) => ({
        ...item,
        isActive: true,
        image: item.image_url,
        createdAt: new Date().toISOString(),
        productImages: [
          {
            id: 'basic-img-' + item.id,
            imageUrl: item.image_url,
            altText: item.name,
            isPrimary: true,
            displayOrder: 1,
          },
        ],
        productVariants: [
          { id: 'v-s', size: 'S', color: 'Solid', stockQuantity: 50 },
          { id: 'v-m', size: 'M', color: 'Solid', stockQuantity: 50 },
          { id: 'v-l', size: 'L', color: 'Solid', stockQuantity: 50 },
          { id: 'v-xl', size: 'XL', color: 'Solid', stockQuantity: 50 },
        ],
        productAttributes: [],
      }));

      // Apply filtering to basic catalog as well
      let filteredBasics = formattedBasics;
      if (activeFilters?.gender) {
        filteredBasics = filteredBasics.filter(
          (p) => p.gender === activeFilters.gender
        );
      }
      if (activeFilters?.category) {
        filteredBasics = filteredBasics.filter((p) => p.category === activeFilters.category);
      }
      if (activeFilters?.categories) {
        filteredBasics = filteredBasics.filter((p) => activeFilters.categories.includes(p.category));
      }
      if (activeFilters?.tag) {
        filteredBasics = filteredBasics.filter((p) => p.tag === activeFilters.tag);
      }
      if (activeFilters?.search) {
        const searchTokens = activeFilters.search.toLowerCase().split(/\s+/);

        // Calculate Score
        filteredBasics = filteredBasics.map(p => {
          let score = 0;
          const name = p.name.toLowerCase();
          const desc = p.description.toLowerCase();
          const cat = p.category.toLowerCase();
          const tags = (p.tag || '').toLowerCase();

          searchTokens.forEach(token => {
            const cleanToken = token.replace(/s$/, ''); // Remove plural
            // Exact Match Bonus
            if (name === token) score += 50;

            // Name Match
            if (name.includes(token)) score += 20;
            if (name.includes(cleanToken)) score += 15;

            // Category/Tag Match
            if (cat.includes(token) || cat.includes(cleanToken)) score += 10;
            if (tags.includes(token)) score += 10;

            // Description Match (Lower weight)
            if (desc.includes(token)) score += 5;
          });

          return { ...p, _searchScore: score };
        })
          .filter(p => p._searchScore > 0) // Must match something
          .sort((a, b) => b._searchScore - a._searchScore); // Best match first
      }
      if (activeFilters?.minPrice) {
        filteredBasics = filteredBasics.filter((p) => p.price >= activeFilters.minPrice);
      }
      if (activeFilters?.maxPrice) {
        filteredBasics = filteredBasics.filter((p) => p.price <= activeFilters.maxPrice);
      }

      // Add unique basics to merged list (avoiding ID collisions if any)
      filteredBasics.forEach((basic) => {
        if (!mergedProducts.some((p) => p.id === basic.id)) {
          mergedProducts.push(basic);
        }
      });

      // Apply final sorting to merged list
      if (activeFilters?.sortBy) {
        if (activeFilters.sortBy === 'price-asc') mergedProducts.sort((a, b) => a.price - b.price);
        if (activeFilters.sortBy === 'price-desc') mergedProducts.sort((a, b) => b.price - a.price);
        if (activeFilters.sortBy === 'name-asc')
          mergedProducts.sort((a, b) => a.name.localeCompare(b.name));
        if (activeFilters.sortBy === 'rating') mergedProducts.sort((a, b) => b.rating - a.rating);
        if (activeFilters.sortBy === 'newest')
          mergedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      return mergedProducts.filter(p => !DENIED_IDS.includes(p.id) && !DENIED_NAMES.some(n => p.name.toUpperCase().includes(n)));
    } catch (error) {
      console.error('Error processing basic catalog:', error);
      return [];
    }
  },

  // Get autocomplete suggestions
  async getSuggestions(term) {
    if (!term || term.length < 1) return [];

    const search = term.toLowerCase();
    const suggestions = [];
    const seen = new Set();

    // 1. Category Suggestions (High Priority)
    // "Joggers" matches "J"
    const uniqueCategories = [...new Set(BASIC_CATALOG.map(p => p.category))];
    uniqueCategories.forEach(cat => {
      const displayCat = cat.replace(/-/g, ' '); // gym-bags -> gym bags
      if (displayCat.startsWith(search)) {
        const label = displayCat.charAt(0).toUpperCase() + displayCat.slice(1);
        if (!seen.has(label)) {
          // Find a representative image for the category
          const repProduct = BASIC_CATALOG.find(p => p.category === cat);
          suggestions.push({ type: 'category', text: label, image: repProduct?.image_url });
          seen.add(label);
        }
      }
    });

    // 2. Product Suggestions
    // "Tactical Gym Bag" matches "G" (Gym) or "T" (Tactical) or "B" (Bag)
    BASIC_CATALOG.forEach(p => {
      if (suggestions.length >= 8) return;

      const name = p.name;
      const nameLower = name.toLowerCase();

      // Check if ANY word in the name starts with the search term
      const words = nameLower.split(/[\s-]+/); // Split on space or hyphen
      const isMatch = words.some(w => w.startsWith(search));

      if (isMatch && !seen.has(name)) {
        suggestions.push({ type: 'product', text: name, image: p.image_url });
        seen.add(name);
      }
    });

    return suggestions.slice(0, 8);
  },

  // Get all products for admin (including inactive and without image filters)
  async getAllForAdmin(filters = {}) {
    try {
      if (!supabase) return [];

      let query = supabase.from('products').select(`
          *,
          product_images(
            id,
            image_url,
            alt_text,
            is_primary
          ),
          product_variants(
            id,
            size,
            color,
            stock_quantity
          ),
          product_attributes(
            id,
            attribute_name,
            attribute_value
          )
        `);

      // Apply filters
      if (filters?.gender) {
        query = query.eq('gender', filters?.gender);
      }
      if (filters?.category) {
        query = query.eq('category', filters?.category);
      }
      if (filters?.brand) {
        query = query.eq('brand', filters?.brand);
      }
      if (filters?.tag) {
        query = query.eq('tag', filters?.tag);
      }
      if (filters?.minPrice) {
        query = query.gte('price', filters?.minPrice);
      }
      if (filters?.maxPrice) {
        query = query.lte('price', filters?.maxPrice);
      }

      // Apply search
      if (filters?.search) {
        query = query.or(
          `name.ilike.%${filters?.search}%,description.ilike.%${filters?.search}%,brand.ilike.%${filters?.search}%`
        );
      }

      // Apply sorting
      if (filters?.sortBy) {
        const sortOptions = {
          'price-asc': { column: 'price', ascending: true },
          'price-desc': { column: 'price', ascending: false },
          'name-asc': { column: 'name', ascending: true },
          'name-desc': { column: 'name', ascending: false },
          rating: { column: 'rating', ascending: false },
          newest: { column: 'created_at', ascending: false },
        };
        const sort = sortOptions?.[filters?.sortBy];
        if (sort) {
          query = query.order(sort?.column, { ascending: sort?.ascending });
        }
      }

      const { data, error } = await query;

      if (error) throw error;

      const dbProducts = data?.map((product) => this.convertToCamelCase(product)) || [];

      // --- MERGE LOGIC ---
      // We want to show hardcoded items too, but DB items take precedence.
      const mergedProducts = [...dbProducts];

      BASIC_CATALOG.forEach(basic => {
        // 1. Check ID Match (Standard)
        const idExists = mergedProducts.some(p => p.id === basic.id);

        // 2. Check Name Match (Legacy Migration Handling)
        // If we migrated 'Men-Shop-1' -> 'uuid-123', the ID won't match, but Name will.
        // We should treat the DB version as the 'real' one and skip the basic one.
        const nameExists = mergedProducts.some(p =>
          p.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() ===
          basic.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
        );

        if (!idExists && !nameExists) {
          // Format Basic to App Structure
          const formatted = {
            id: basic.id,
            name: basic.name,
            description: basic.description,
            price: basic.price,
            originalPrice: basic.original_price,
            gender: basic.gender,
            category: basic.category,
            brand: basic.brand,
            rating: basic.rating,
            reviewCount: basic.review_count,
            tag: basic.tag,
            isActive: basic.is_active,
            image: basic.image_url,
            stockQuantity: 100, // Default stock for static items
            productImages: [{
              id: 'basic-img-' + basic.id,
              imageUrl: basic.image_url,
              altText: basic.name,
              isPrimary: true
            }],
            productVariants: [
              { id: 'v-s', size: 'S', color: 'Solid', stockQuantity: 50 },
              { id: 'v-m', size: 'M', color: 'Solid', stockQuantity: 50 },
              { id: 'v-l', size: 'L', color: 'Solid', stockQuantity: 50 },
              { id: 'v-xl', size: 'XL', color: 'Solid', stockQuantity: 50 }
            ],
            productAttributes: []
          };
          mergedProducts.push(formatted);
        }
      });

      return mergedProducts;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get single product by ID
  async getById(productId) {
    if (DENIED_IDS.includes(productId)) return null;

    try {
      let productData = null;

      // 1. Try fetching from Supabase
      if (supabase) {
        const { data, error } = await supabase
          .from('products')
          .select(
            `
            *,
            product_images(
              id,
              image_url,
              alt_text,
              is_primary,
              display_order
            ),
            product_variants(
              id,
              size,
              color,
              stock_quantity
            ),
            product_attributes(
              id,
              attribute_name,
              attribute_value
            )
          `
          )
          .eq('id', productId)
          .single();

        if (!error && data) {
          productData = this.convertToCamelCase(data);
        }
      }

      // 2. Fallback to BASIC_CATALOG if not found in DB
      if (!productData) {
        const basicProduct = BASIC_CATALOG.find((p) => p.id === productId);
        if (basicProduct) {
          // Format basic product to match application structure
          productData = {
            id: basicProduct.id,
            name: basicProduct.name,
            description: basicProduct.description,
            price: basicProduct.price,
            originalPrice: basicProduct.original_price,
            gender: basicProduct.gender,
            category: basicProduct.category,
            brand: basicProduct.brand,
            rating: basicProduct.rating,
            reviewCount: basicProduct.review_count,
            tag: basicProduct.tag,
            isActive: basicProduct.is_active,
            image: basicProduct.image_url,
            productImages: [
              {
                id: 'basic-img-' + basicProduct.id,
                imageUrl: basicProduct.image_url,
                altText: basicProduct.name,
                isPrimary: true,
                displayOrder: 1,
              },
            ],
            productVariants: [
              { id: 'v-s', size: 'S', color: 'Solid', stockQuantity: 50 },
              { id: 'v-m', size: 'M', color: 'Solid', stockQuantity: 50 },
              { id: 'v-l', size: 'L', color: 'Solid', stockQuantity: 50 },
              { id: 'v-xl', size: 'XL', color: 'Solid', stockQuantity: 50 },
              { id: 'v-xxl', size: 'XXL', color: 'Solid', stockQuantity: 50 },
            ],
            productAttributes: [],
          };
        }
      }

      if (!productData) {
        throw new Error(`Product not found with ID: ${productId}`);
      }

      return productData;
    } catch (error) {
      console.warn(`Error fetching product ${productId}:`, error);
      // Depending on requirement, we might want to return null instead of throwing
      // But page.jsx expects null or throw to show "Not Found"
      return null;
    }
  },

  // Get unique filter options
  async getFilterOptions(gender = null) {
    try {
      if (!supabase) return { brands: [], categories: [], tags: [] };

      let query = supabase.from('products').select('brand, category, tag').eq('is_active', true);

      if (gender) {
        query = query.eq('gender', gender);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Extract unique values
      const brands = [...new Set(data?.map((p) => p?.brand))].sort();
      const categories = [...new Set(data?.map((p) => p?.category))].sort();
      const tags = [...new Set(data?.map((p) => p?.tag).filter(Boolean))].sort();

      return {
        brands,
        categories,
        tags,
      };
    } catch (error) {
      console.error('Error fetching filter options:', error);
      throw error;
    }
  },

  // Search products across all categories
  async search(searchTerm) {
    try {
      if (!supabase) return [];

      const { data, error } = await supabase
        .from('products')
        .select(
          `
          *,
          product_images!inner(
            id,
            image_url,
            alt_text,
            is_primary
          )
        `
        )
        .eq('is_active', true)
        .eq('product_images.is_primary', true)
        .or(
          `name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,brand.ilike.%${searchTerm}%`
        )
        .limit(50);

      if (error) throw error;

      return (data?.map((product) => this.convertToCamelCase(product)) || [])
        .filter(p => !DENIED_IDS.includes(p.id) && !DENIED_NAMES.some(n => p.name.toUpperCase().includes(n)));
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },

  // Convert snake_case to camelCase
  convertToCamelCase(product) {
    if (!product) return null;

    const plainImages = {
      tshirts: '/assets/images/products/plain_white_tshirt_flat_lay_1767417660339.png',
      joggers: '/assets/images/products/plain_gray_joggers_flat_lay_2_1767417737544.png',
      hoodies: '/assets/images/products/plain_gray_hoodie_flat_lay_1767417698358.png',
      leggings: '/assets/images/products/plain_black_leggings_flat_lay_1767417679501.png',
      shorts: '/assets/images/products/plain_black_shorts_flat_lay_1767418127534.png',
      default: '/assets/images/products/plain_white_tshirt_flat_lay_1767417660339.png',
    };

    const category = product?.category;
    // Find primary image from DB
    const primaryImgObj =
      product?.product_images?.find((img) => img.is_primary) || product?.product_images?.[0];
    const dbImage = primaryImgObj?.image_url;

    // Use DB image if valid, otherwise fallback to static map
    const finalImage =
      dbImage && dbImage.length > 5 ? dbImage : plainImages[category] || plainImages['default'];

    return {
      id: product?.id,
      name: product?.name,
      description: product?.description,
      price: product?.price,
      originalPrice: product?.original_price,
      gender: product?.gender,
      category: product?.category,
      brand: product?.brand,
      rating: product?.rating,
      reviewCount: product?.review_count,
      reviews: product?.review_count, // Added for UI compatibility
      tag: product?.tag,
      isActive: product?.is_active,
      remarks: product?.remarks,
      stockQuantity: product?.stock_quantity,
      createdAt: product?.created_at,
      updatedAt: product?.updated_at,
      image: finalImage,
      productImages: product?.product_images?.map((img) => ({
        id: img?.id,
        imageUrl: img?.image_url,
        altText: img?.alt_text || product?.name,
        isPrimary: img?.is_primary,
        displayOrder: img?.display_order,
      })) || [
          {
            id: 'default',
            imageUrl: finalImage,
            altText: product?.name,
            isPrimary: true,
            displayOrder: 1,
          },
        ],
      productVariants: product?.product_variants?.map((v) => ({
        id: v?.id,
        size: v?.size,
        color: v?.color,
        stockQuantity: v?.stock_quantity,
      })),
      productAttributes: product?.product_attributes?.map((attr) => ({
        id: attr?.id,
        attributeName: attr?.attribute_name,
        attributeValue: attr?.attribute_value,
      })),
    };
  },

  // Create new product
  async createProduct(productData) {
    try {
      if (!supabase) throw new Error('Supabase client not initialized');

      // 1. Insert product details
      const { data, error: productError } = await supabase
        .from('products')
        .insert({
          name: productData?.name,
          description: productData?.description,
          price: productData?.price,
          original_price: productData?.originalPrice,
          gender: productData?.gender,
          category: productData?.category,
          brand: productData?.brand,
          tag: productData?.tag,
          is_active: productData?.isActive ?? true,
          stock_quantity: productData?.stockQuantity,
          remarks: productData?.remarks,
          rating: 0,
          review_count: 0,
        })
        .select();

      if (productError) throw productError;
      const product = data?.[0];

      // 2. Insert product image
      if (productData?.imageUrl && product) {
        const { error: imageError } = await supabase.from('product_images').insert({
          product_id: product.id,
          image_url: productData.imageUrl,
          alt_text: productData.name,
          is_primary: true,
          display_order: 1,
        });
        if (imageError) throw imageError;
      }

      // 3. Insert Variants
      if (productData?.productVariants?.length > 0) {
        const variants = productData.productVariants.map(v => ({
          product_id: product.id,
          size: v.size,
          color: v.color || 'Solid',
          stock_quantity: v.stockQuantity || 0
        }));
        const { error: variantError } = await supabase.from('product_variants').insert(variants);
        if (variantError) throw variantError;
      }

      // 4. Insert Attributes
      if (productData?.productAttributes?.length > 0) {
        const attrs = productData.productAttributes.map(a => ({
          product_id: product.id,
          attribute_name: a.attributeName,
          attribute_value: a.attributeValue
        }));
        const { error: attrError } = await supabase.from('product_attributes').insert(attrs);
        if (attrError) throw attrError;
      }

      // Fetch complete to return
      const { data: completeProduct } = await supabase
        .from('products')
        .select(`
          *,
          product_images(*),
          product_variants(*),
          product_attributes(*)
        `)
        .eq('id', product.id)
        .single();

      return this.convertToCamelCase(completeProduct);
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Update product
  async updateProduct(id, updates) {
    try {
      if (!supabase) throw new Error('Supabase client not initialized');

      console.log('🔧 productService.updateProduct called');
      console.log('📌 Product ID:', id);
      console.log('📦 Updates received:', updates);

      // Map camelCase updates to snake_case
      const dbUpdates = {};
      if (updates.name !== undefined) dbUpdates.name = updates.name;
      if (updates.description !== undefined) dbUpdates.description = updates.description;
      if (updates.price !== undefined) dbUpdates.price = updates.price;
      if (updates.originalPrice !== undefined) dbUpdates.original_price = updates.originalPrice;
      if (updates.stockQuantity !== undefined) dbUpdates.stock_quantity = updates.stockQuantity;
      if (updates.isActive !== undefined) dbUpdates.is_active = updates.isActive;
      if (updates.category !== undefined) dbUpdates.category = updates.category;
      if (updates.gender !== undefined) dbUpdates.gender = updates.gender;
      if (updates.brand !== undefined) dbUpdates.brand = updates.brand;
      if (updates.tag !== undefined) dbUpdates.tag = updates.tag;
      if (updates.remarks !== undefined) dbUpdates.remarks = updates.remarks;

      console.log('💾 Database updates (snake_case):', dbUpdates);

      const { data, error } = await supabase
        .from('products')
        .update(dbUpdates)
        .eq('id', id)
        .select();

      console.log('📡 Supabase response - data:', data);

      if (error) throw error;

      // --- AUTO-MIGRATION FIX FOR LEGACY IDS ---
      // If data is empty, it means the ID doesn't exist in DB.
      // 1. If it's a Text ID (Legacy), we MUST generate a new UUID.
      if (!data || data.length === 0) {
        console.log('⚠️ Product is missing/legacy. performing migration...');

        let newId = id;
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

        if (!isUuid) {
          console.log('🔄 Detected Legacy ID. Generating new UUID...');
          newId = crypto.randomUUID(); // Browser native UUID
        }

        const insertPayload = {
          id: newId,
          name: updates.name,
          description: updates.description,
          price: updates.price,
          original_price: updates.originalPrice,
          stock_quantity: updates.stockQuantity,
          is_active: updates.isActive,
          category: updates.category,
          gender: updates.gender,
          brand: updates.brand,
          tag: updates.tag,
          remarks: updates.remarks,
          rating: updates.rating || 0,
          review_count: updates.reviewCount || 0
        };

        const { data: inserted, error: insertError } = await supabase.from('products').insert(insertPayload).select().single();

        if (insertError) throw insertError;

        console.log('✅ Migration successful. New ID:', newId);

        // Return the NEW object (camelCased) so UI can update ID
        return this.convertToCamelCase(inserted);
      }
      // --------------------------

      // Update Image if provided
      if (updates.imageUrl) {
        console.log('🖼️ Updating image URL:', updates.imageUrl);
        // Check if primary image exists
        const { data: images } = await supabase
          .from('product_images')
          .select('id')
          .eq('product_id', id)
          .eq('is_primary', true);

        if (images && images.length > 0) {
          // Update existing
          await supabase
            .from('product_images')
            .update({ image_url: updates.imageUrl })
            .eq('id', images[0].id);
          console.log('✅ Image updated');
        } else {
          // Insert new
          await supabase.from('product_images').insert({
            product_id: id,
            image_url: updates.imageUrl,
            alt_text: updates.name || 'Product Image',
            is_primary: true,
            display_order: 1,
          });
          console.log('✅ Image inserted');
        }
      }

      // Update Variants if provided
      if (updates.productVariants) {
        console.log('🔄 Syncing Variants...');
        // 1. Get existing IDs
        const { data: existingVariants } = await supabase
          .from('product_variants')
          .select('id')
          .eq('product_id', id);

        const existingIds = existingVariants?.map(v => v.id) || [];
        const incomingIds = updates.productVariants.filter(v => v.id && !v.id.startsWith('temp-')).map(v => v.id);

        // 2. Delete removed variants
        const toDelete = existingIds.filter(eid => !incomingIds.includes(eid));
        if (toDelete.length > 0) {
          await supabase.from('product_variants').delete().in('id', toDelete);
        }

        // 3. Upsert incoming
        for (const v of updates.productVariants) {
          const variantData = {
            product_id: id,
            size: v.size,
            color: v.color || 'Solid',
            stock_quantity: v.stockQuantity || 0
          };

          if (v.id && !v.id.startsWith('temp-')) {
            // Update
            await supabase.from('product_variants').update(variantData).eq('id', v.id);
          } else {
            // Insert
            await supabase.from('product_variants').insert(variantData);
          }
        }
      }

      // Update Attributes if provided
      if (updates.productAttributes) {
        console.log('🔄 Syncing Attributes...');
        const { data: existingAttrs } = await supabase
          .from('product_attributes')
          .select('id')
          .eq('product_id', id);

        const existingIds = existingAttrs?.map(a => a.id) || [];
        const incomingIds = updates.productAttributes.filter(a => a.id && !a.id.startsWith('temp-')).map(a => a.id);

        const toDelete = existingIds.filter(eid => !incomingIds.includes(eid));
        if (toDelete.length > 0) {
          await supabase.from('product_attributes').delete().in('id', toDelete);
        }

        for (const a of updates.productAttributes) {
          const attrData = {
            product_id: id,
            attribute_name: a.attributeName,
            attribute_value: a.attributeValue
          };

          if (a.id && !a.id.startsWith('temp-')) {
            await supabase.from('product_attributes').update(attrData).eq('id', a.id);
          } else {
            await supabase.from('product_attributes').insert(attrData);
          }
        }
      }

      // Fetch the complete updated product with all relations
      const { data: completeProduct, error: fetchError } = await supabase
        .from('products')
        .select(
          `
          *,
          product_images(
            id,
            image_url,
            alt_text,
            is_primary,
            display_order
          ),
          product_variants(
            id,
            size,
            color,
            stock_quantity
          ),
          product_attributes(
            id,
            attribute_name,
            attribute_value
          )
        `
        )
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      console.log('✅ Final updated product with relations:', completeProduct);
      return this.convertToCamelCase(completeProduct);
    } catch (error) {
      console.error('❌ Error updating product:', error);
      throw error;
    }
  },

  // Delete product
  async deleteProduct(id) {
    try {
      if (!supabase) throw new Error('Supabase client not initialized');

      const { error } = await supabase.from('products').delete().eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  // Sync basic catalog with database
  async syncBasicCatalog() {
    try {
      if (!supabase) throw new Error('Supabase not initialized');

      console.log('🔄 Starting Catalog Sync...');
      let syncCount = 0;

      const productsToSync = BASIC_CATALOG.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        original_price: item.original_price,
        gender: item.gender,
        category: item.category,
        brand: item.brand,
        tag: item.tag,
        is_active: true,
        stock_quantity: 100, // Default stock for sync
        rating: item.rating || 0,
        review_count: item.review_count || 0
      }));

      for (const product of productsToSync) {
        const { error: pError } = await supabase.from('products').upsert(product, { onConflict: 'id' });
        if (pError) {
          console.error(`❌ Error syncing product ${product.id}:`, pError.message);
          continue;
        }

        syncCount++;

        // Sync primary image
        const basicItem = BASIC_CATALOG.find(i => i.id === product.id);
        if (basicItem && basicItem.image_url) {
          await supabase.from('product_images').upsert({
            product_id: product.id,
            image_url: basicItem.image_url,
            alt_text: product.name,
            is_primary: true,
            display_order: 1
          }, { onConflict: 'product_id' });
        }
      }

      console.log(`✅ Sync Complete. ${syncCount} items processed.`);
      return { success: true, count: syncCount };
    } catch (error) {
      console.error('Error in syncBasicCatalog:', error);
      return { success: false, error: error.message };
    }
  }
};

export const wishlistService = {
  // Add to wishlist
  async add(userId, productId) {
    try {
      const { data, error } =
        (await supabase
          ?.from('wishlists')
          ?.insert({ user_id: userId, product_id: productId })
          ?.select()
          ?.single()) || {};

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  },

  // Remove from wishlist
  async remove(userId, productId) {
    try {
      const { error } =
        (await supabase
          ?.from('wishlists')
          ?.delete()
          ?.eq('user_id', userId)
          ?.eq('product_id', productId)) || {};

      if (error) throw error;
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  },

  // Get user wishlist
  async getByUserId(userId) {
    try {
      const { data, error } =
        (await supabase?.from('wishlists')?.select('product_id')?.eq('user_id', userId)) || {};

      if (error) throw error;
      return data?.map((w) => w?.product_id) || [];
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      throw error;
    }
  },
};
