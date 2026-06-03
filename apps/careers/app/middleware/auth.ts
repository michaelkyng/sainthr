// Universal: runs server-side during SSR (redirect before any HTML is sent —
// no flash) and again client-side for in-app navigations.
export default defineNuxtRouteMiddleware(async (to) => {
  const snap = await getAccessSnapshot()
  const redirect = guardAuthed(snap, to.fullPath)
  if (redirect) return navigateTo(redirect)
})
