export default defineNuxtRouteMiddleware(async (to) => {
  const auth = await ensureAuthReady()
  if (!auth) return

  if (!auth.isSignedIn.value) {
    return navigateTo({
      path: "/auth/login",
      query: { redirect_url: to.fullPath },
    })
  }
})
