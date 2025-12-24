import { supabase } from '../supabase';

export const productService = {
  // Get all products with optional filters
  async getAll(filters = {}) {
    try {
      if (!supabase) return [];

      let query = supabase.from('products').select(`
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
        `).eq('is_active', true).eq('product_images.is_primary', true);

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
        query = query.or(`name.ilike.%${filters?.search}%,description.ilike.%${filters?.search}%,brand.ilike.%${filters?.search}%`);
      }

      // Apply sorting
      if (filters?.sortBy) {
        const sortOptions = {
          'price-asc': { column: 'price', ascending: true },
          'price-desc': { column: 'price', ascending: false },
          'name-asc': { column: 'name', ascending: true },
          'name-desc': { column: 'name', ascending: false },
          'rating': { column: 'rating', ascending: false },
          'newest': { column: 'created_at', ascending: false }
        };
        const sort = sortOptions?.[filters?.sortBy];
        if (sort) {
          query = query.order(sort?.column, { ascending: sort?.ascending });
        }
      }

      const { data, error } = await query;

      if (error) throw error;

      // Convert to camelCase
      return data?.map(product => this.convertToCamelCase(product)) || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get single product by ID
  async getById(productId) {
    try {
      if (!supabase) return null;

      const { data, error } = await supabase.from('products').select(`
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
        `).eq('id', productId).eq('is_active', true).single();

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
      const brands = [...new Set(data?.map(p => p?.brand))].sort();
      const categories = [...new Set(data?.map(p => p?.category))].sort();
      const tags = [...new Set(data?.map(p => p?.tag).filter(Boolean))].sort();

      return {
        brands,
        categories,
        tags
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

      const { data, error } = await supabase.from('products').select(`
          *,
          product_images!inner(
            id,
            image_url,
            alt_text,
            is_primary
          )
        `).eq('is_active', true).eq('product_images.is_primary', true).or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,brand.ilike.%${searchTerm}%`).limit(50);

      if (error) throw error;

      return data?.map(product => this.convertToCamelCase(product)) || [];
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },

  // Convert snake_case to camelCase
  convertToCamelCase(product) {
    if (!product) return null;

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
      productImages: product?.product_images?.map(img => ({
        id: img?.id,
        imageUrl: img?.image_url,
        altText: img?.alt_text,
        isPrimary: img?.is_primary,
        displayOrder: img?.display_order
      })),
      productVariants: product?.product_variants?.map(v => ({
        id: v?.id,
        size: v?.size,
        color: v?.color,
        stockQuantity: v?.stock_quantity
      })),
      productAttributes: product?.product_attributes?.map(attr => ({
        id: attr?.id,
        attributeName: attr?.attribute_name,
        attributeValue: attr?.attribute_value
      }))
    };
  }
};

export const wishlistService = {
  // Add to wishlist
  async add(userId, productId) {
    try {
      const { data, error } = await supabase?.from('wishlists')?.insert({ user_id: userId, product_id: productId })?.select()?.single();

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
      const { error } = await supabase?.from('wishlists')?.delete()?.eq('user_id', userId)?.eq('product_id', productId);

      if (error) throw error;
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  },

  // Get user wishlist
  async getByUserId(userId) {
    try {
      const { data, error } = await supabase?.from('wishlists')?.select('product_id')?.eq('user_id', userId);

      if (error) throw error;
      return data?.map(w => w?.product_id) || [];
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      throw error;
    }
  }
};