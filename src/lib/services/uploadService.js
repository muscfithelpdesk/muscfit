import { supabase } from '../supabase';

export const uploadService = {
    /**
     * Uploads a file to the specified bucket
     * @param {File} file - The file to upload
     * @param {string} bucket - The bucket name (default: 'products')
     * @param {string} folder - Optional folder path
     * @returns {Promise<string>} - The public URL of the uploaded file
     */
    async uploadFile(file, bucket = 'products', folder = '') {
        try {
            if (!supabase) throw new Error('Supabase client not initialized');

            // 1. Validate file
            if (!file) throw new Error('No file provided');

            // Limit size to 5MB
            const MAX_SIZE = 5 * 1024 * 1024;
            if (file.size > MAX_SIZE) {
                throw new Error('File size exceeds 5MB limit');
            }

            // 2. Generate unique file path
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
            const filePath = folder ? `${folder}/${fileName}` : fileName;

            // 3. Upload to Supabase Storage
            const { data, error } = await supabase.storage
                .from(bucket)
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (error) throw error;

            // 4. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from(bucket)
                .getPublicUrl(filePath);

            return publicUrl;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    }
};
