import { getUser } from "$lib/server/auth";
import { redirect, type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { handleSession } from "svelte-kit-cookie-session";

/*
  This file act like middleware
*/

const routeGuard: Handle = async ({ resolve, event }) => {
  const PROTECTED_ROUTE = ['/(authed)'];

  const user = await getUser();

  if (PROTECTED_ROUTE.some((route) => event.route.id?.startsWith(route))) {
    if (!user?.username) {
      redirect(303, '/signin');
    }
  }

  return resolve(event);
}

const sessionHandler: Handle = handleSession({
  secret: 'DgFrJy8oku0zDGSMV37qCkAwF9FgoCpo',
});

export const handle = sequence(sessionHandler, routeGuard)