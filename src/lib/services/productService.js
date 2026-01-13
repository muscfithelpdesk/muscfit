import { supabase } from '../supabase';

const BASIC_CATALOG = [
  // Men's Collection (4 Items)
  {
    id: 'm-bb-t-1',
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
    id: 'm-gb-t-2',
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
    id: 'm-wb-t-3',
    name: "Men's Elite T-Shirt (White)",
    description: 'Aura white performance tee. Crisp, clean, and unbranded.',
    price: 999,
    original_price: 1499,
    gender: 'men',
    category: 'tshirts',
    brand: 'MUSCFIT',
    tag: 'BASIC',
    is_active: true,
    rating: 4.9,
    review_count: 142,
    image_url: '/assets/images/products/plain_white_tshirt_flat_lay_1767417660339.png',
  },
  {
    id: 'm-bb-j-4',
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
    id: 'w-bb-l-1',
    name: "Vital Seamless Leggings 2.0 - Black",
    description: 'Squat-proof, high-waisted seamless technology. Contouring textures map your body for a flattering fit.',
    price: 1599,
    original_price: 2199,
    gender: 'women',
    category: 'leggings',
    brand: 'MUSCFIT',
    tag: 'VIRAL',
    is_active: true,
    rating: 4.9,
    review_count: 342,
    image_url: '/assets/images/products/womens_black_leggings_basic.png',
  },
  {
    id: 'w-gb-l-2',
    name: "Women's Performance Leggings (Grey)",
    description: 'Heather grey performance leggings. Sleek design, zero branding.',
    price: 1599,
    original_price: 2199,
    gender: 'women',
    category: 'leggings',
    brand: 'MUSCFIT',
    tag: 'BASIC',
    is_active: true,
    rating: 4.8,
    review_count: 156,
    image_url: '/assets/images/products/womens_grey_leggings_basic.png',
  },
  {
    id: 'w-wb-l-3',
    name: "Women's Performance Leggings (White)",
    description: 'Aura white performance leggings. Crisp, clean, and unbranded.',
    price: 1599,
    original_price: 2199,
    gender: 'women',
    category: 'leggings',
    brand: 'MUSCFIT',
    tag: 'BASIC',
    is_active: true,
    rating: 4.9,
    review_count: 88,
    image_url: '/assets/images/products/plain_white_tshirt_flat_lay_1767417660339.png', // Placeholder (unbranded tee for white)
  },
  {
    id: 'w-bb-l-4',
    name: "Women's Core Shorts (Black)",
    description: 'Solid black training shorts. High-waist, high-performance.',
    price: 1299,
    original_price: 1799,
    gender: 'women',
    category: 'leggings', // Mapped to leggings to fill the homepage grid tab
    brand: 'MUSCFIT',
    tag: 'NEW',
    is_active: true,
    rating: 4.7,
    review_count: 54,
    image_url: '/assets/images/products/plain_black_shorts_flat_lay_1767418127534.png',
  },

  // Compression Series (4 Items)
  {
    id: 'c-bb-s-1',
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
    id: 'c-wb-s-2',
    name: 'Elite Compression Shirt (White)',
    description: 'Advanced white compression base layer. Thermal regulation technology.',
    price: 1299,
    original_price: 1999,
    gender: 'compression',
    category: 'tshirts',
    brand: 'MUSCFIT',
    tag: 'BASIC',
    is_active: true,
    rating: 4.8,
    review_count: 98,
    image_url: '/assets/images/products/plain_white_tshirt_flat_lay_1767417660339.png',
  },
  {
    id: 'c-gb-s-3',
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
    id: 'c-bb-s-4',
    name: 'Aero-Tech Compression Tee (Black)',
    description: 'Breathable black compression tee for high-intensity training.',
    price: 1399,
    original_price: 1899,
    gender: 'compression',
    category: 'tshirts',
    brand: 'MUSCFIT',
    tag: 'BASIC',
    is_active: true,
    rating: 4.8,
    review_count: 112,
    image_url: '/assets/images/products/mens_black_tshirt_basic.png',
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
    id: 'compression-1',
    name: 'MuscFIT Elite Compression Long Sleeve',
    description: 'Pro-grade compression in earth tone Taupe.',
    price: 1599,
    original_price: 2199,
    gender: 'compression',
    category: 'tshirts',
    brand: 'MUSCFIT',
    tag: 'featured',
    is_active: true,
    rating: 4.9,
    review_count: 123,
    image_url: '/assets/images/compression-1.png',
  },
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

export const productService = {
  // Get all products with optional filters
  async getAll(filters = {}) {
    // Clone filters to avoid mutation side effects and implement smart keywords
    const activeFilters = { ...filters };

    if (activeFilters.search) {
      let term = activeFilters.search.toLowerCase().trim();

      // 1. Extract Gender/Category keywords using word boundaries (prevent "supplement" matching "men")
      const menRegex = /\b(men|mens|man|male)\b/i;
      const womenRegex = /\b(women|womens|woman|female)\b/i;
      const accRegex = /\b(accessories|accessory|equipment|gear|bag|bags|supplement|supplements|protein|nutrition)\b/i;
      const compRegex = /\b(compression|running|base layer)\b/i;

      // Check filters and apply strict rules
      if (menRegex.test(term)) {
        activeFilters.gender = 'men';
        // Remove the keyword from the search term to clean up results (e.g. "men tshirt" -> "tshirt")
        term = term.replace(menRegex, '').trim();
      } else if (womenRegex.test(term)) {
        activeFilters.gender = 'women';
        term = term.replace(womenRegex, '').trim();
      } else if (compRegex.test(term)) {
        // Note: Compression is a 'gender' type in our DB schema
        activeFilters.gender = 'compression';
        term = term.replace(compRegex, '').trim();
      } else if (accRegex.test(term)) {
        // Special Accessories handling: Include all accessory-related categories
        // Verify we match general accessory terms or specific ones
        if (term.includes('accessories') || term.includes('accessory') || term.includes('equipment') || term.includes('gear') || term.includes('supplement') || term.includes('protein')) {
          activeFilters.categories = ['accessories', 'equipment', 'supplements', 'gym-bags'];
          // Remove the general terms
          term = term.replace(/\b(accessories|accessory|equipment|gear|supplement|supplements|protein|nutrition)\b/i, '').trim();
        } else {
          // If detailed word like "bag" is present, we might want to still filter by category?
          // For now, let's broaden the scope if it matches the regex
          activeFilters.categories = ['accessories', 'equipment', 'supplements', 'gym-bags'];
        }
      }

      // 2. Update the search filter
      if (!term) {
        // If the user only typed "men" or "accessories", remove the text search entirely 
        // so we return ALL items in that category/gender instead of looking for the word "men" in the description.
        delete activeFilters.search;
      } else {
        // Otherwise search for the remaining specific item (e.g. "tshirt") within that gender
        activeFilters.search = term;
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
            product_images!inner(
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
          .eq('is_active', true)
          .eq('product_images.is_primary', true);

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
        const search = activeFilters.search.toLowerCase();
        filteredBasics = filteredBasics.filter(
          (p) =>
            p.name.toLowerCase().includes(search) || p.description.toLowerCase().includes(search)
        );
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

      return mergedProducts;
    } catch (error) {
      console.error('Error processing basic catalog:', error);
      return [];
    }
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

      // Convert to camelCase
      return data?.map((product) => this.convertToCamelCase(product)) || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get single product by ID
  async getById(productId) {
    try {
      if (!supabase) return null;

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
        .eq('is_active', true)
        .single();

      if (error) throw error;

      return this.convertToCamelCase(data);
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
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

      return data?.map((product) => this.convertToCamelCase(product)) || [];
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
      tag: product?.tag,
      isActive: product?.is_active,
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

      return this.convertToCamelCase(product);
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

      console.log('💾 Database updates (snake_case):', dbUpdates);

      const { data, error } = await supabase
        .from('products')
        .update(dbUpdates)
        .eq('id', id)
        .select();

      console.log('📡 Supabase response - error:', error);
      console.log('📡 Supabase response - data:', data);

      if (error) throw error;

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
