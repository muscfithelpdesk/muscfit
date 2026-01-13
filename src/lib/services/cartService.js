import { supabase } from '../supabase';

export const cartService = {
    // Get user's cart
    async getCart(userId) {
        if (!supabase) return [];

        const { data, error } = await supabase
            .from('cart')
            .select(`
        id,
        user_id,
        product_id,
        quantity,
        product:products (
          id,
          name,
          price,
          product_images (
            image_url,
            is_primary
          ),
          stock_quantity
        )
      `)
            .eq('user_id', userId)
            .order('created_at', { ascending: true });

        if (error) {
            // If table doesn't exist, we might get an error, but let's assume it does for now.
            console.error('Error fetching cart:', error);
            return [];
        }

        return data.map(item => {
            const product = item.product;
            if (!product) return null;

            const primaryImage = product.product_images?.find(img => img.is_primary)?.image_url
                || product.product_images?.[0]?.image_url
                || '/assets/images/no_image.png';

            return {
                id: product.id, // Use product ID as the main identifier for the UI
                cartId: item.id, // Keep track of the DB record ID
                name: product.name,
                price: product.price,
                image: primaryImage,
                quantity: item.quantity,
                maxStock: product.stock_quantity
            };
        }).filter(Boolean);
    },

    // Add item to cart
    async addToCart(userId, productId, quantity = 1) {
        if (!supabase) throw new Error('Supabase client not initialized');

        // Check if item already exists
        const { data: existing } = await supabase
            .from('cart')
            .select('id, quantity')
            .eq('user_id', userId)
            .eq('product_id', productId)
            .single();

        if (existing) {
            // Update quantity
            const newQuantity = existing.quantity + quantity;
            const { data, error } = await supabase
                .from('cart')
                .update({ quantity: newQuantity })
                .eq('id', existing.id)
                .select()
                .single();

            if (error) throw error;
            return data;
        } else {
            // Insert new
            const { data, error } = await supabase
                .from('cart')
                .insert({
                    user_id: userId,
                    product_id: productId,
                    quantity: quantity
                })
                .select()
                .single();

            if (error) throw error;
            return data;
        }
    },

    // Update quantity
    async updateQuantity(userId, productId, quantity) {
        if (!supabase) throw new Error('Supabase client not initialized');

        const { data, error } = await supabase
            .from('cart')
            .update({ quantity })
            .eq('user_id', userId)
            .eq('product_id', productId)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Remove item
    async removeFromCart(userId, productId) {
        if (!supabase) throw new Error('Supabase client not initialized');

        const { error } = await supabase
            .from('cart')
            .delete()
            .eq('user_id', userId)
            .eq('product_id', productId);

        if (error) throw error;
        return true;
    },

    // Clear cart
    async clearCart(userId) {
        if (!supabase) throw new Error('Supabase client not initialized');

        const { error } = await supabase
            .from('cart')
            .delete()
            .eq('user_id', userId);

        if (error) throw error;
        return true;
    }
};
