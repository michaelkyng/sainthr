export default defineNuxtRouteMiddleware(async () => {
  const auth = await ensureAuthReady()
  if (!auth) return

  if (!auth.isSignedIn.value) return

  if (auth.role.value === "employer") {
    return navigateTo(auth.isEmployerOnboarded.value ? "/company/dashboard" : "/company/onboarding")
  }

  if (auth.role.value === "candidate") {
    return navigateTo(auth.isCandidateOnboarded.value ? "/profile" : "/onboarding")
  }

  return navigateTo("/jobs")
})
