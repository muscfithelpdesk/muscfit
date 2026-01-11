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
};
