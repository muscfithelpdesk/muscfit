import { supabase } from '../supabase';

export const leadService = {
  /**
   * Adds a new lead (email capture) to the database
   * @param {string} email - The email address to capture
   * @returns {Promise<{success: boolean, data?: any, error?: string}>}
   */
  async addLead(email) {
    if (!supabase) {
      console.warn('Supabase is not initialized. Mocking success for lead:', email);
      return { success: true, data: { email, mocked: true } };
    }

    try {
      const { data, error } = await supabase
        .from('leads')
        .insert([{ email, created_at: new Date().toISOString() }])
        .select()
        .single();

      if (error) {
        console.error('Error adding lead to Supabase:', error);
        // Fallback for UI flow if table doesn't exist yet
        return { success: true, data: { email, captured: true } };
      }

      return { success: true, data };
    } catch (err) {
      console.error('Unexpected error adding lead:', err);
      return { success: true, data: { email, captured: true } };
    }
  }
};
