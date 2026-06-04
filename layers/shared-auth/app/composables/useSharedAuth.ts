import {
  ACTIVE_ROLE_COOKIE,
  homeForRole,
  normalizeRoles,
  resolveActiveRole,
  type SharedAuthRole,
} from "../utils/access"

export const useSharedAuth = () => {
  const auth = useAuth()
  const { isLoaded, isSignedIn, user } = useUser()

  const fullName = computed(() => {
    const currentUser = user.value
    if (!currentUser) return ""

    return (
      currentUser.fullName
      || [currentUser.firstName, currentUser.lastName].filter(Boolean).join(" ")
      || currentUser.primaryEmailAddress?.emailAddress
      || ""
    )
  })

  const email = computed(() => (
    user.value?.primaryEmailAddress?.emailAddress
    || user.value?.emailAddresses?.[0]?.emailAddress
    || ""
  ))

  // Backend-writable, frontend-readable. The authoritative role set lives here.
  const publicMetadata = computed(
    () => (user.value?.publicMetadata ?? {}) as Record<string, unknown>,
  )

  // Frontend-writable. Used only for the signup role *hint* and onboarding
  // flags — treated as untrusted for authorization purposes.
  const unsafeMetadata = computed(
    () => (user.value?.unsafeMetadata ?? {}) as Record<string, unknown>,
  )

  // Authoritative role set, backend-written to publicMetadata.
  const roles = computed<SharedAuthRole[]>(() => normalizeRoles(publicMetadata.value.roles))

  const hasRole = (r: SharedAuthRole) => roles.value.includes(r)

  // The active context — constrained to a role the user actually has. If the
  // cookie is missing/invalid but the user has exactly one role, that role is
  // the implicit active context.
  const activeRoleCookie = useCookie<SharedAuthRole | null>(ACTIVE_ROLE_COOKIE, {
    default: () => null,
    sameSite: "lax",
    path: "/",
  })

  const activeRole = computed<SharedAuthRole | null>(() =>
    resolveActiveRole(roles.value, activeRoleCookie.value),
  )

  const setActiveRole = (r: SharedAuthRole) => {
    if (!hasRole(r)) return
    activeRoleCookie.value = r
  }

  // Authoritative onboarding state is backend-owned (DB `isOnboarded`, mirrored
  // to publicMetadata + session claims).
  const isCandidateOnboarded = computed(() => publicMetadata.value.candidateOnboarded === true)
  const isEmployerOnboarded = computed(() => publicMetadata.value.employerOnboarded === true)

  // Marks the active role onboarded on the backend (which sets DB `isOnboarded`
  // and mirrors it to publicMetadata + the session token), then refreshes the
  // local Clerk user + session so the new state is reflected immediately.
  const markOnboarded = async (r: SharedAuthRole) => {
    const apiBaseUrl = (useRuntimeConfig().public as Record<string, unknown>)
      .apiBaseUrl as string | undefined
    const token = await auth.getToken.value()
    if (apiBaseUrl && token) {
      await $fetch(`${apiBaseUrl}/auth/onboarding`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: { role: r },
      })
    }
    await user.value?.reload?.()
    await auth.getToken.value({ skipCache: true }).catch(() => null)
  }

  // Onboarding-aware landing for a role — shares logic with the server guards.
  const homeFor = (r: SharedAuthRole) =>
    homeForRole(r, {
      candidate: isCandidateOnboarded.value,
      employer: isEmployerOnboarded.value,
    })

  const getBearerToken = async (template?: string) => {
    const token = await auth.getToken.value(template ? { template } : undefined)
    return token ? `Bearer ${token}` : null
  }

  const getAuthHeaders = async (template?: string) => {
    const authorization = await getBearerToken(template)
    return authorization ? { Authorization: authorization } : {}
  }

  // Hand the signup role *hint* to the backend, which validates it and writes
  // the authoritative role into publicMetadata, then refresh the local Clerk
  // user + session token so `roles` reflects the change immediately (closes
  // both the "no role persisted" and "stale token" windows).
  const bootstrap = async (intendedRole?: SharedAuthRole | null) => {
    if (import.meta.server) return

    const apiBaseUrl = (useRuntimeConfig().public as Record<string, unknown>)
      .apiBaseUrl as string | undefined

    if (apiBaseUrl) {
      const authorization = await getBearerToken()
      if (authorization) {
        await $fetch(`${apiBaseUrl}/auth/me`, {
          method: "POST",
          headers: { Authorization: authorization },
          body: { intendedRole: intendedRole ?? unsafeMetadata.value.role ?? null },
        }).catch(() => null)
      }
    }

    await user.value?.reload?.()
    await auth.getToken.value({ skipCache: true }).catch(() => null)
  }

  return {
    isLoaded,
    isSignedIn,
    user,
    userId: auth.userId,
    sessionId: auth.sessionId,
    fullName,
    email,
    roles,
    hasRole,
    activeRole,
    setActiveRole,
    homeFor,
    isCandidateOnboarded,
    isEmployerOnboarded,
    markOnboarded,
    bootstrap,
    signOut: auth.signOut,
    getToken: auth.getToken,
    getBearerToken,
    getAuthHeaders,
  }
}
