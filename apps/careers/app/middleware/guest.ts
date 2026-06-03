// Universal guard for guest-only pages (login / signup): signed-in users are
// bounced to their active context (or the chooser) before any HTML renders.
export default defineNuxtRouteMiddleware(async () => {
  const snap = await getAccessSnapshot()
  const redirect = guardGuest(snap)
  if (redirect) return navigateTo(redirect)
})
