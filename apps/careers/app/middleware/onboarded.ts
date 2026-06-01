export default defineNuxtRouteMiddleware(async () => {
  const auth = await ensureAuthReady()
  if (!auth) return
  if (!auth.isSignedIn.value) return

  if (auth.role.value === "employer") {
    if (!auth.isEmployerOnboarded.value) return navigateTo("/company/onboarding")
    return
  }

  if (auth.role.value === "candidate") {
    if (!auth.isCandidateOnboarded.value) return navigateTo("/onboarding")
  }
})
