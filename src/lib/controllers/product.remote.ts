import { query } from '$app/server';
import { supabase } from '$lib/db/supabase';

export const getProducts = query(async () => {
  const products = await supabase.from('products').select();
  return products;
});