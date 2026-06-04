import {
  ACTIVE_ROLE_COOKIE,
  normalizeRoles,
  resolveActiveRole,
  type AccessSnapshot,
} from "./access"

const claimFlag = (claims: Record<string, unknown> | null, key: string) =>
  claims?.[key] === true || claims?.[key] === "true"

export const ensureAuthReady = async () => {
  if (import.meta.server) return null

  const auth = useSharedAuth()
  if (auth.isLoaded.value) return auth

  await new Promise<void>((resolve) => {
    const stop = watch(
      auth.isLoaded,
      (loaded) => {
        if (loaded) {
          stop()
          resolve()
        }
      },
      { immediate: true },
    )
  })
  return auth
}

// A single access snapshot that both server and client middleware decide on.
//
// - Server: reads the verified Clerk session synchronously from the request
//   (`event.context.auth()`), so the redirect happens before any HTML is sent —
//   no flash. Roles and onboarding flags come from the session JWT claims, which
//   the backend mirrors from the DB via publicMetadata (see README).
// - Client: waits for Clerk to hydrate, then reads from useSharedAuth (which
//   reads the same backend-owned publicMetadata). Covers in-app navigations.
export const getAccessSnapshot = async (): Promise<AccessSnapshot> => {
  if (import.meta.server) {
    const event = useRequestEvent()
    const ctx = event?.context as {
      auth?: () => { userId?: string | null; sessionClaims?: Record<string, unknown> | null }
    } | undefined
    const authObject = ctx?.auth?.()
    const claims = (authObject?.sessionClaims ?? null) as Record<string, unknown> | null
    const roles = normalizeRoles(claims?.roles)

    return {
      isSignedIn: !!authObject?.userId,
      roles,
      activeRole: resolveActiveRole(roles, useCookie(ACTIVE_ROLE_COOKIE).value),
      onboarded: {
        candidate: claimFlag(claims, "candidateOnboarded"),
        employer: claimFlag(claims, "employerOnboarded"),
      },
    }
  }

  const auth = await ensureAuthReady()
  if (!auth) {
    return {
      isSignedIn: false,
      roles: [],
      activeRole: null,
      onboarded: { candidate: false, employer: false },
    }
  }

  return {
    isSignedIn: !!auth.isSignedIn.value,
    roles: auth.roles.value,
    activeRole: auth.activeRole.value,
    onboarded: {
      candidate: auth.isCandidateOnboarded.value,
      employer: auth.isEmployerOnboarded.value,
    },
  }
}
