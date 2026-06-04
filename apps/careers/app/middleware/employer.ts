// Universal guard. Server-side it decides from the verified session + the
// active-role cookie before any HTML renders; client-side it re-checks for
// in-app navigations. Enforces both authorization (holds the employer role)
// and the active context (is currently acting as employer). Switching roles
// happens only via the login chooser or the navbar "Switch role" action.
export default defineNuxtRouteMiddleware(async (to) => {
  const snap = await getAccessSnapshot()
  const redirect = guardSection(snap, "employer", to.fullPath)
  if (redirect) return navigateTo(redirect)
})
