import { query } from '$app/server';
import { supabase } from '$lib/db/supabase';
import * as v from 'valibot';

// Query untuk mendapatkan semua categories
export const getCategories = query(async () => {
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    throw new Error(`Error fetching categories: ${error.message}`);
  }

  return categories;
});

// Query untuk mendapatkan category by ID
export const getCategory = query(
  v.pipe(v.string(), v.nonEmpty()),
  async (id: string) => {
    const categoryId = parseInt(id);

    const { data: category, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', categoryId)
      .single();

    if (error) {
      throw new Error(`Error fetching category: ${error.message}`);
    }

    return category;
  }
);

// Query untuk mendapatkan category by slug
export const getCategoryBySlug = query(
  v.pipe(v.string(), v.nonEmpty()),
  async (slug: string) => {
    const { data: category, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      throw new Error(`Error fetching category by slug: ${error.message}`);
    }

    return category;
  }
);