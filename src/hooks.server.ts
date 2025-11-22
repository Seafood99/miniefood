import type { Handle } from "@sveltejs/kit";

/*
  This file act like middleware
*/

export const handle: Handle = async ({ event, resolve }) => {
  return resolve(event)
}