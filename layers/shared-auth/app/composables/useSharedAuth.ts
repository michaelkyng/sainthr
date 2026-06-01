export type SharedAuthRole = "candidate" | "employer"

const isSharedAuthRole = (value: unknown): value is SharedAuthRole =>
  value === "candidate" || value === "employer"

const onboardedKey = (r: SharedAuthRole) =>
  r === "employer" ? "employerOnboarded" : "candidateOnboarded"

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

  const metadata = computed(
    () => (user.value?.unsafeMetadata ?? {}) as Record<string, unknown>,
  )

  const role = computed<SharedAuthRole | null>(() => {
    const metadataRole = metadata.value.role
    return isSharedAuthRole(metadataRole) ? metadataRole : null
  })

  const isCandidateOnboarded = computed(() => metadata.value.candidateOnboarded === true)
  const isEmployerOnboarded = computed(() => metadata.value.employerOnboarded === true)

  const markOnboarded = async (r: SharedAuthRole) => {
    const u = user.value
    if (!u) return
    await u.update({
      unsafeMetadata: {
        ...metadata.value,
        [onboardedKey(r)]: true,
      },
    })
  }

  const getBearerToken = async (template?: string) => {
    const token = await auth.getToken.value(template ? { template } : undefined)
    return token ? `Bearer ${token}` : null
  }

  const getAuthHeaders = async (template?: string) => {
    const authorization = await getBearerToken(template)
    return authorization ? { Authorization: authorization } : {}
  }

  return {
    isLoaded,
    isSignedIn,
    user,
    userId: auth.userId,
    sessionId: auth.sessionId,
    fullName,
    email,
    role,
    isCandidateOnboarded,
    isEmployerOnboarded,
    markOnboarded,
    signOut: auth.signOut,
    getToken: auth.getToken,
    getBearerToken,
    getAuthHeaders,
  }
}
