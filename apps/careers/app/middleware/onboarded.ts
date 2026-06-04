// Universal: applied to pages that require a finished profile. Server-side it
// reads onboarding from the session claims (no flash); client-side from the
// Clerk user. Stacked after candidate/employer, so the active role is the one
// being checked. Defers when onboarding state isn't known in this context.
export default defineNuxtRouteMiddleware(async () => {
  const snap = await getAccessSnapshot()
  const redirect = guardOnboarded(snap)
  if (redirect) return navigateTo(redirect)
})
