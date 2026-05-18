export type UserProfile = {
  fullName: string
  email: string
  jobTitle: string
  experience: string
  location: string
  bio: string
  skills: string[]
  preferredJobTypes: string[]
  preferredArrangements: string[]
  resumeName: string
  resumeSize: string
  linkedinUrl: string
  isOnboarded: boolean
}

const defaultProfile = (): UserProfile => ({
  fullName: '',
  email: '',
  jobTitle: '',
  experience: '',
  location: '',
  bio: '',
  skills: [],
  preferredJobTypes: [],
  preferredArrangements: [],
  resumeName: '',
  resumeSize: '',
  linkedinUrl: '',
  isOnboarded: false,
})

export const useProfile = () => {
  const profile = useState<UserProfile>('user-profile', defaultProfile)

  const initials = computed(() => {
    if (!profile.value.fullName) return '?'
    return profile.value.fullName
      .split(' ')
      .slice(0, 2)
      .map(n => n[0]?.toUpperCase() ?? '')
      .join('')
  })

  const completionItems = computed(() => [
    { label: 'Job title', done: !!profile.value.jobTitle },
    { label: 'Location', done: !!profile.value.location },
    { label: 'Bio', done: !!profile.value.bio },
    { label: 'Skills added', done: profile.value.skills.length > 0 },
    { label: 'Work preferences', done: profile.value.preferredJobTypes.length > 0 },
    { label: 'Resume uploaded', done: !!profile.value.resumeName },
  ])

  const completionScore = computed(() => {
    const done = completionItems.value.filter(i => i.done).length
    return Math.round((done / completionItems.value.length) * 100)
  })

  return { profile, initials, completionItems, completionScore }
}
