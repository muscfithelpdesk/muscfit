import { supabase } from '../supabase';

export const userService = {
  // Get user profile
  async getProfile(userId) {
    if (!supabase) return null;

    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 is "no rows returned"
      console.error('Error fetching profile:', error);
      return null;
    }

    return data;
  },

  // Update user profile
  async updateProfile(userId, updates) {
    if (!supabase) return { success: false, error: 'Supabase not initialized' };

    const { data, error } = await supabase
      .from('profiles')
      .upsert({ id: userId, ...updates, updated_at: new Date() })
      .select()
      .single();

    if (error) {
      console.error('Error updating profile:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  },

  // Get user addresses
  async getAddresses(userId) {
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', userId)
      .order('is_default', { ascending: false });

    if (error) {
      console.error('Error fetching addresses:', error);
      return [];
    }

    return data;
  },

  // Save or Update address
  async saveAddress(userId, address) {
    if (!supabase) return { success: false, error: 'Supabase not initialized' };

    const addressData = {
      ...address,
      user_id: userId,
      updated_at: new Date(),
    };

    const { data, error } = await supabase.from('addresses').upsert(addressData).select().single();

    if (error) {
      console.error('Error saving address:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  },

  // Delete address
  async deleteAddress(addressId) {
    if (!supabase) return { success: false, error: 'Supabase not initialized' };

    const { error } = await supabase.from('addresses').delete().eq('id', addressId);

    if (error) {
      console.error('Error deleting address:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  },

  // --- Admin Functions ---

  // Get all users (Admin only)
  async getAllUsers() {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all users:', error);
      throw error;
    }
    return data || [];
  },

  // Get overall platform stats
  async getAdminStats() {
    if (!supabase) return null;

    try {
      const [users, orders, products] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('orders').select('id, total_amount, payment_status, created_at'),
        supabase.from('products').select('id, stock_quantity')
      ]);

      const totalUsers = users.count || 0;
      const totalOrders = orders.data?.length || 0;
      const totalRevenue = orders.data?.reduce((sum, o) => o.payment_status === 'Paid' ? sum + o.total_amount : sum, 0) || 0;
      const lowStockCount = products.data?.filter(p => p.stock_quantity < 10).length || 0;

      return {
        totalUsers,
        totalOrders,
        totalRevenue,
        lowStockCount,
        traffic: {
          dailyVisits: 1240,
          conversionRate: 3.2,
          growthHistory: [
            { day: 'Mon', users: 10, orders: 2 },
            { day: 'Tue', users: 18, orders: 5 },
            { day: 'Wed', users: 25, orders: 8 },
            { day: 'Thu', users: 32, orders: 12 },
            { day: 'Fri', users: 45, orders: 20 },
            { day: 'Sat', users: 50, orders: 25 },
            { day: 'Sun', users: 62, orders: 30 },
          ]
        }
      };
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      return null;
    }
  }
};
