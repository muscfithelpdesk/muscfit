import { supabase } from '../supabase';

const BASIC_CATALOG = [
  // Men's Collection (4 Items)
  {
    id: 'm-bb-t-1',
    name: "Men's Elite T-Shirt (Black)",
    description: 'High-performance, minimalist black t-shirt. Breathable fabric, no branding.',
    price: 999,
    original_price: 1499,
    gender: 'men',
    category: 'tshirts',
    brand: 'MUSCFIT',
    tag: 'BASIC',
    is_active: true,
    rating: 4.8,
    review_count: 124,
    image_url: '/assets/images/products/mens_black_tshirt_basic.png',
  },
  {
    id: 'm-gb-t-2',
    name: "Men's Elite T-Shirt (Grey)",
    description: 'Premium heather grey training shirt. Superior comfort and fit.',
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
    name: "Men's Training Joggers (Black)",
    description: 'Tapered fit joggers in solid black. Perfect for gym and lifestyle.',
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
    name: "Women's Performance Leggings (Black)",
    description: 'Squat-proof, high-waist black leggings. Maximum compression and comfort.',
    price: 1599,
    original_price: 2199,
    gender: 'women',
    category: 'leggings',
    brand: 'MUSCFIT',
    tag: 'BESTSELLER',
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
    name: 'Elite Compression Shirt (Black)',
    description: 'Base layer tech shirt in solid black. Enhances blood flow and recovery.',
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
    name: 'Essential Training Bag (Black)',
    description: 'Durable black gym bag with multiple compartments. Clean, logo-free design.',
    price: 2499,
    original_price: 3499,
    gender: 'unisex',
    category: 'accessories',
    brand: 'MUSCFIT',
    tag: 'HOT',
    is_active: true,
    rating: 4.7,
    review_count: 92,
    image_url: '/assets/images/products/plain_black_shorts_flat_lay_1767418127534.png',
  },
  {
    id: 'a-wb-b-2',
    name: 'Essential Training Bag (White)',
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
    image_url: '/assets/images/products/plain_white_tshirt_flat_lay_1767417660339.png',
  },
  {
    id: 'a-gb-t-3',
    name: 'Performance Lifting Belt (Grey)',
    description: 'Adjustable grey lifting belt for core stability.',
    price: 1599,
    original_price: 2199,
    gender: 'unisex',
    category: 'accessories',
    brand: 'MUSCFIT',
    tag: 'BASIC',
    is_active: true,
    rating: 4.9,
    review_count: 156,
    image_url: '/assets/images/products/plain_gray_joggers_flat_lay_2_1767417737544.png',
  },
  {
    id: 'a-bb-w-4',
    name: 'Adjustable Wrist Wraps (Black)',
    description: 'Heavy-duty black wrist wraps for heavy lifts.',
    price: 799,
    original_price: 1199,
    gender: 'unisex',
    category: 'accessories',
    brand: 'MUSCFIT',
    tag: 'BASIC',
    is_active: true,
    rating: 4.8,
    review_count: 234,
    image_url: '/assets/images/products/plain_black_tshirt_flat_lay_2_1767417716871.png',
  },
];

export const productService = {
  // Get all products with optional filters
  async getAll(filters = {}) {
    try {
      let dbProducts = [];
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
        if (!error && data) {
          dbProducts = data.map((product) => this.convertToCamelCase(product));
        }
      }

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
      if (filters?.gender) {
        filteredBasics = filteredBasics.filter(
          (p) => p.gender === filters.gender || p.gender === 'unisex'
        );
      }
      if (filters?.category) {
        filteredBasics = filteredBasics.filter((p) => p.category === filters.category);
      }
      if (filters?.tag) {
        filteredBasics = filteredBasics.filter((p) => p.tag === filters.tag);
      }
      if (filters?.search) {
        const search = filters.search.toLowerCase();
        filteredBasics = filteredBasics.filter(
          (p) =>
            p.name.toLowerCase().includes(search) || p.description.toLowerCase().includes(search)
        );
      }
      if (filters?.minPrice) {
        filteredBasics = filteredBasics.filter((p) => p.price >= filters.minPrice);
      }
      if (filters?.maxPrice) {
        filteredBasics = filteredBasics.filter((p) => p.price <= filters.maxPrice);
      }

      // Add unique basics to merged list (avoiding ID collisions if any)
      filteredBasics.forEach((basic) => {
        if (!mergedProducts.some((p) => p.id === basic.id)) {
          mergedProducts.push(basic);
        }
      });

      // Apply final sorting to merged list
      if (filters?.sortBy) {
        if (filters.sortBy === 'price-asc') mergedProducts.sort((a, b) => a.price - b.price);
        if (filters.sortBy === 'price-desc') mergedProducts.sort((a, b) => b.price - a.price);
        if (filters.sortBy === 'name-asc') mergedProducts.sort((a, b) => a.name.localeCompare(b.name));
        if (filters.sortBy === 'rating') mergedProducts.sort((a, b) => b.rating - a.rating);
        if (filters.sortBy === 'newest')
          mergedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      return mergedProducts;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
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
