// Pure, framework-agnostic access-control logic shared by the client composable
// (useSharedAuth) and the server-side route middleware. Keeping it free of Nuxt
// / Clerk imports guarantees the two contexts make identical decisions.
//
// The authoritative inputs are backend-owned: roles + onboarding flags live in
// the DB, are mirrored to Clerk publicMetadata, and surfaced into the session
// token claims (server) / read from the Clerk user (client).

export type SharedAuthRole = "candidate" | "employer"

export type OnboardingState = Record<SharedAuthRole, boolean>

export const ACTIVE_ROLE_COOKIE = "sainthr_active_role"

export const isSharedAuthRole = (value: unknown): value is SharedAuthRole =>
  value === "candidate" || value === "employer"

export const normalizeRoles = (raw: unknown): SharedAuthRole[] => {
  const list = Array.isArray(raw) ? raw.filter(isSharedAuthRole) : []
  return [...new Set(list)]
}

// The active role is always clamped to a role the user actually holds. A single
// held role is its own implicit active context.
export const resolveActiveRole = (
  roles: SharedAuthRole[],
  cookieValue: unknown,
): SharedAuthRole | null => {
  if (isSharedAuthRole(cookieValue) && roles.includes(cookieValue)) return cookieValue
  return roles.length === 1 ? roles[0]! : null
}

const onboardingPathForRole = (r: SharedAuthRole) =>
  r === "employer" ? "/company/onboarding" : "/onboarding"

const dashboardForRole = (r: SharedAuthRole) =>
  r === "employer" ? "/company/dashboard" : "/profile"

// Onboarding-aware landing for a role.
export const homeForRole = (r: SharedAuthRole, onboarded: OnboardingState) =>
  onboarded[r] ? dashboardForRole(r) : onboardingPathForRole(r)

export type AccessSnapshot = {
  isSignedIn: boolean
  roles: SharedAuthRole[]
  activeRole: SharedAuthRole | null
  onboarded: OnboardingState
}

export type AccessRedirect = string | { path: string; query: Record<string, string> }

const loginRedirect = (toFullPath: string): AccessRedirect => ({
  path: "/auth/login",
  query: { redirect_url: toFullPath },
})

// Where to send a signed-in user when no specific section is implied.
export const resolveHomePath = (snap: AccessSnapshot): string => {
  if (snap.activeRole) return homeForRole(snap.activeRole, snap.onboarded)
  if (snap.roles.length > 1) return "/auth/continue"
  if (snap.roles.length === 1) return homeForRole(snap.roles[0]!, snap.onboarded)
  return "/jobs"
}

// Require only that the user is signed in.
export const guardAuthed = (
  snap: AccessSnapshot,
  toFullPath: string,
): AccessRedirect | null => (snap.isSignedIn ? null : loginRedirect(toFullPath))

// Require signed-in, holding `required`, and currently acting as it. The active
// role only changes via the login chooser or the navbar "Switch role" action —
// this never auto-switches.
export const guardSection = (
  snap: AccessSnapshot,
  required: SharedAuthRole,
  toFullPath: string,
): AccessRedirect | null => {
  if (!snap.isSignedIn) return loginRedirect(toFullPath)
  if (!snap.roles.includes(required)) return resolveHomePath(snap)
  if (snap.activeRole !== required) return resolveHomePath(snap)
  return null
}

// Guest-only pages (login / signup): bounce signed-in users to where they belong.
export const guardGuest = (snap: AccessSnapshot): AccessRedirect | null =>
  snap.isSignedIn ? resolveHomePath(snap) : null

// Real pages that require a finished profile: send not-yet-onboarded users to
// the onboarding flow for their active role.
export const guardOnboarded = (snap: AccessSnapshot): AccessRedirect | null => {
  const r = snap.activeRole
  if (!r) return null
  return snap.onboarded[r] ? null : onboardingPathForRole(r)
}

// Onboarding pages: send already-onboarded users to their dashboard.
export const guardNotOnboarded = (snap: AccessSnapshot): AccessRedirect | null => {
  const r = snap.activeRole
  if (!r) return null
  return snap.onboarded[r] ? dashboardForRole(r) : null
}
