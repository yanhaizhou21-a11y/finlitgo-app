const usersByGoogleId = new Map()
const usersById = new Map()

function normalizeGoogleProfile(profile) {
  const googleId = profile?.id
  const name = profile?.displayName ?? 'Unknown'
  const email = profile?.emails?.[0]?.value ?? null
  const avatar = profile?.photos?.[0]?.value ?? null

  if (!googleId) {
    throw new Error('Google profile missing id')
  }

  return { googleId, name, email, avatar }
}

export async function findOrCreateGoogleUser(profile) {
  const { googleId, name, email, avatar } = normalizeGoogleProfile(profile)

  const existing = usersByGoogleId.get(googleId)
  if (existing) return existing

  const user = {
    id: `google:${googleId}`,
    googleId,
    name,
    email,
    avatar,
  }

  usersByGoogleId.set(googleId, user)
  usersById.set(user.id, user)
  return user
}

export async function findUserById(id) {
  return usersById.get(id) ?? null
}