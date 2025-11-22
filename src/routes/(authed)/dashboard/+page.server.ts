import { supabase } from '$lib/db/supabase';

export async function load({ locals }) {
  const { data } = await supabase.from("admins").select('username').eq("username", locals.session.data?.username).single();
  return {
    user: data
  }
};