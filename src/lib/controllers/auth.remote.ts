import { redirect, fail } from '@sveltejs/kit';
import { supabase } from '$lib/db/supabase';
import { form } from '$app/server';
import bcrypt from "bcryptjs";
import * as v from 'valibot';
import { resolve } from '$app/paths';
import { loginUser } from '$lib/server/auth';

export const signIn = form(
  v.object({
    username: v.pipe(v.string(), v.nonEmpty()),
    password: v.pipe(v.string(), v.nonEmpty())
  }),
  async (data, issue) => {
    const admins = await supabase.from('admins').select().eq('username', data.username).single();

    if (!admins) {
      fail(401, issue.username('Invalid username or password'));
    }

    const verified = await bcrypt.compare(data.password, admins.data?.password || '');

    if (!verified) {
      fail(401, issue.username('Invalid username or password'));
    }

    await loginUser(admins.data?.username || '');

    redirect(303, resolve('/dashboard'));
  }
);