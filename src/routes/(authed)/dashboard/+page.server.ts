import { supabase } from '$lib/server/supabase';

export const load = async (event) => {
  const user = await supabase.from("admins").select()
  return {
    user: user.data
  }
};