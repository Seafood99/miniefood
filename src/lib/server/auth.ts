import { getRequestEvent } from "$app/server"

export const getUser = async () => {
  const user = getRequestEvent().locals.session.data
  return user
}

export const loginUser = async (username: string) => {
  const session = getRequestEvent().locals.session
  await session.update(() => ({ username }))
}

export const logoutUser = async () => {
  const session = getRequestEvent().locals.session
  await session.destroy()
}