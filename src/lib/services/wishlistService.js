import { supabase } from '../supabase';

export const wishlistService = {
    // Get user's wishlist
    async getWishlist(userId) {
        if (!supabase) return [];

        const { data, error } = await supabase
            .from('wishlist')
            .select(`
        id,
        user_id,
        product_id,
        created_at,
        product:products (
          id,
          name,
          price,
          description,
          product_images (
            image_url,
            is_primary
          ),
          stock_quantity,
          is_active
        )
      `)
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;

        return data.map(item => {
            const product = item.product;
            // Handle case where product might be null if deleted
            if (!product) return null;

            const primaryImage = product.product_images?.find(img => img.is_primary)?.image_url
                || product.product_images?.[0]?.image_url
                || '/assets/images/no_image.png';

            return {
                id: product.id, // We use product ID for the frontend item ID mostly
                wishlistId: item.id, // The ID of the wishlist record itself
                name: product.name,
                price: product.price,
                image: primaryImage,
                alt: product.name,
                inStock: product.stock_quantity > 0,
                originalPrice: null, // Assuming no original price in DB yet or derived logic
                discount: null
            };
        }).filter(item => item !== null);
    },

    // Add item to wishlist
    async addToWishlist(userId, productId) {
        if (!supabase) throw new Error('Supabase client not initialized');

        // Check if already exists
        const { data: existing } = await supabase
            .from('wishlist')
            .select('id')
            .eq('user_id', userId)
            .eq('product_id', productId)
            .single();

        if (existing) return existing;

        const { data, error } = await supabase
            .from('wishlist')
            .insert({
                user_id: userId,
                product_id: productId
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Remove item from wishlist
    async removeFromWishlist(userId, productId) {
        if (!supabase) throw new Error('Supabase client not initialized');

        const { error } = await supabase
            .from('wishlist')
            .delete()
            .eq('user_id', userId)
            .eq('product_id', productId);

        if (error) throw error;
        return true;
    },

    // Check if item is in wishlist
    async isInWishlist(userId, productId) {
        if (!supabase) return false;

        const { data, error } = await supabase
            .from('wishlist')
            .select('id')
            .eq('user_id', userId)
            .eq('product_id', productId)
            .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 is 'not found' which is fine
            console.error('Error checking wishlist status:', error);
        }

        return !!data;
    }
};
