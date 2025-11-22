import { query, form } from '$app/server';
import { supabase } from '$lib/db/supabase';
import { redirect, fail } from '@sveltejs/kit';
import * as v from 'valibot';
import { resolve } from '$app/paths';
import { uploadPhotos } from '$lib/server/file';

// Query untuk mendapatkan semua products
export const getProducts = query(async () => {
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      categories (
        name,
        slug
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Error fetching products: ${error.message}`);
  }

  return products;
});

// Query untuk mendapatkan product by ID
export const getProduct = query(
  v.pipe(v.string(), v.nonEmpty()),
  async (id) => {
    const productId = parseInt(id);

    const { data: product, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (
          name,
          slug
        )
      `)
      .eq('id', productId)
      .single();

    if (error) {
      throw new Error(`Error fetching product: ${error.message}`);
    }

    return product;
  }
);

// Query untuk mendapatkan products by category
export const getProductsByCategory = query(
  v.pipe(v.string(), v.nonEmpty()),
  async (categorySlug) => {
    const { data: products, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (
          name,
          slug
        )
      `)
      .eq('categories.slug', categorySlug)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Error fetching products by category: ${error.message}`);
    }

    return products;
  }
);


// Create product dengan form()
export const createProduct = form(
  v.object({
    name: v.pipe(v.string(), v.nonEmpty('Nama produk harus diisi')),
    description: v.pipe(v.string(), v.nonEmpty('Deskripsi harus diisi')),
    price: v.pipe(
      v.string(),
      v.nonEmpty('Harga harus diisi'),
      v.transform(Number),
      v.minValue(0, 'Harga tidak boleh negatif')
    ),
    category_id: v.pipe(
      v.string(),
      v.nonEmpty('Kategori harus dipilih'),
      v.transform(Number),
      v.minValue(1, 'Kategori harus dipilih')
    ),
    link: v.optional(
      v.pipe(
        v.string(),
        v.url('Link harus berupa URL valid')
      )
    ),
    photos: v.optional(v.any()) // Untuk file upload
  }),
  async ({ name, description, price, category_id, link, photos }, issue) => {
    try {
      // Buat product terlebih dahulu (tanpa photos)
      const { data: product, error: productError } = await supabase
        .from('products')
        .insert({
          name,
          description,
          price,
          category_id,
          link: link || null,
          photos: [] // Sementara kosong
        })
        .select()
        .single();

      if (productError) {
        return fail(400, issue.name(`Error creating product: ${productError.message}`));
      }

      // Upload photos jika ada
      if (photos && photos.length > 0 && photos[0].size > 0) {
        try {
          const photoUrls = await uploadPhotos(photos, product.id);

          // Update product dengan photo URLs
          const { error: updateError } = await supabase
            .from('products')
            .update({ photos: photoUrls })
            .eq('id', product.id);

          if (updateError) {
            console.error('Error updating product photos:', updateError);
          }
        } catch (uploadError) {
          // Jika upload gagal, hapus product yang sudah dibuat
          await supabase.from('products').delete().eq('id', product.id);
          return fail(400, issue.name(`Error uploading photos: ${uploadError}`));
        }
      }

      // Redirect ke halaman products atau product detail
      redirect(303, resolve('/dashboard'));

    } catch (error) {
      return fail(500, issue.name(`Internal server error: ${error}`));
    }
  }
);

// Update product dengan form()
export const updateProduct = form(
  v.object({
    id: v.pipe(
      v.string(),
      v.nonEmpty('ID produk harus diisi'),
      v.transform(Number)
    ),
    name: v.pipe(v.string(), v.nonEmpty('Nama produk harus diisi')),
    description: v.pipe(v.string(), v.nonEmpty('Deskripsi harus diisi')),
    price: v.pipe(
      v.string(),
      v.nonEmpty('Harga harus diisi'),
      v.transform(Number),
      v.minValue(0, 'Harga tidak boleh negatif')
    ),
    category_id: v.pipe(
      v.string(),
      v.nonEmpty('Kategori harus dipilih'),
      v.transform(Number),
      v.minValue(1, 'Kategori harus dipilih')
    ),
    link: v.optional(
      v.pipe(
        v.string(),
        v.url('Link harus berupa URL valid')
      )
    ),
    new_photos: v.optional(v.any()),
    remove_photos: v.optional(v.array(v.string()))
  }),
  async ({ id, name, description, price, category_id, link, new_photos, remove_photos }, issue) => {
    try {
      // Dapatkan product saat ini
      const { data: currentProduct, error: fetchError } = await supabase
        .from('products')
        .select('photos')
        .eq('id', id)
        .single();

      if (fetchError) {
        return fail(404, issue.name('Product tidak ditemukan'));
      }

      // @ts-ignore
      let currentPhotoUrls: string[] = currentProduct?.photos || [];

      // Hapus photos yang dipilih
      if (remove_photos && remove_photos.length > 0) {
        currentPhotoUrls = currentPhotoUrls.filter(url => !remove_photos.includes(url));
      }

      // Upload photos baru
      let newPhotoUrls: string[] = [];
      if (new_photos && new_photos.length > 0 && new_photos[0].size > 0) {
        newPhotoUrls = await uploadPhotos(new_photos, id);
      }

      // Gabungkan photos
      const allPhotos = [...currentPhotoUrls, ...newPhotoUrls];

      // Update product
      const { error: updateError } = await supabase
        .from('products')
        .update({
          name,
          description,
          price,
          category_id,
          link: link || null,
          photos: allPhotos
        })
        .eq('id', id);

      if (updateError) {
        return fail(400, issue.name(`Error updating product: ${updateError.message}`));
      }

      // Redirect ke halaman products atau product detail
      redirect(303, resolve('/dashboard'));

    } catch (error) {
      return fail(500, issue.name(`Internal server error: ${error}`));
    }
  }
);

// Delete product dengan form()
export const deleteProduct = form(
  v.object({
    id: v.pipe(
      v.string(),
      v.nonEmpty('ID produk harus diisi'),
      v.transform(Number)
    )
  }),
  async ({ id }, issue) => {
    try {
      // Hapus photos dari storage terlebih dahulu (opsional)
      const { data: product } = await supabase
        .from('products')
        .select('photos')
        .eq('id', id)
        .single();

      // TODO: Implementasi hapus file dari storage jika diperlukan

      // Hapus product
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        return fail(400, issue.id(`Error deleting product: ${error.message}`));
      }

      // Redirect ke halaman products
      redirect(303, resolve('/dashboard'));

    } catch (error) {
      return fail(500, issue.id(`Internal server error: ${error}`));
    }
  }
);