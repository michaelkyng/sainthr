// Universal: applied to the onboarding pages themselves. Sends already-onboarded
// users to their dashboard. Server-side from session claims (no flash),
// client-side from the Clerk user. Defers when onboarding state isn't known.
export default defineNuxtRouteMiddleware(async () => {
  const snap = await getAccessSnapshot()
  const redirect = guardNotOnboarded(snap)
  if (redirect) return navigateTo(redirect)
})
