import { supabase } from "$lib/db/supabase";

// Fungsi helper untuk upload photos ke Supabase Storage
export async function uploadPhotos(files: File[], productId: number): Promise<string[]> {
  const uploadedPhotos: string[] = [];

  for (const file of files) {
    // Validasi file type
    if (!file.type.startsWith('image/')) {
      throw new Error('File harus berupa gambar');
    }

    // Validasi file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('Ukuran file maksimal 5MB');
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${productId}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

    // Upload ke Supabase Storage
    const { data, error } = await supabase.storage
      .from('products')
      .upload(fileName, file);

    if (error) {
      throw new Error(`Error uploading photo: ${error.message}`);
    }

    // Dapatkan URL public
    const { data: { publicUrl } } = supabase.storage
      .from('products')
      .getPublicUrl(data.path);

    uploadedPhotos.push(publicUrl);
  }

  return uploadedPhotos;
}