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
  },

  // Create new product
  async createProduct(productData) {
    try {
      if (!supabase) throw new Error('Supabase client not initialized');

      // 1. Insert product details
      const { data: product, error: productError } = await supabase.from('products').insert({
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
        review_count: 0
      }).select().single();

      if (productError) throw productError;

      // 2. Insert product image
      if (productData?.imageUrl) {
        const { error: imageError } = await supabase.from('product_images').insert({
          product_id: product?.id,
          image_url: productData?.imageUrl,
          alt_text: productData?.name,
          is_primary: true,
          display_order: 1
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

      // Map camelCase updates to snake_case
      const dbUpdates = {};
      if (updates.name !== undefined) dbUpdates.name = updates.name;
      if (updates.description !== undefined) dbUpdates.description = updates.description;
      if (updates.price !== undefined) dbUpdates.price = updates.price;
      if (updates.stockQuantity !== undefined) dbUpdates.stock_quantity = updates.stockQuantity;
      if (updates.isActive !== undefined) dbUpdates.is_active = updates.isActive;
      if (updates.category !== undefined) dbUpdates.category = updates.category;
      if (updates.gender !== undefined) dbUpdates.gender = updates.gender;
      if (updates.brand !== undefined) dbUpdates.brand = updates.brand;

      const { data, error } = await supabase.from('products')
        .update(dbUpdates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return this.convertToCamelCase(data);
    } catch (error) {
      console.error('Error updating product:', error);
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