import { defineStore } from "pinia"

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
}

export type CandidateSettings = {
  notifications: {
    jobMatches: boolean
    applicationUpdates: boolean
    weeklyDigest: boolean
    productNews: boolean
  }
  privacy: {
    visibleToRecruiters: boolean
    showInSearch: boolean
    shareResumeWithEmployers: boolean
  }
  preferences: {
    digestFrequency: "daily" | "weekly" | "never"
  }
}

const defaultProfile = (): UserProfile => ({
  fullName: "",
  email: "",
  jobTitle: "",
  experience: "",
  location: "",
  bio: "",
  skills: [],
  preferredJobTypes: [],
  preferredArrangements: [],
  resumeName: "",
  resumeSize: "",
  linkedinUrl: "",
})

const defaultSettings = (): CandidateSettings => ({
  notifications: {
    jobMatches: true,
    applicationUpdates: true,
    weeklyDigest: false,
    productNews: false,
  },
  privacy: {
    visibleToRecruiters: true,
    showInSearch: true,
    shareResumeWithEmployers: true,
  },
  preferences: {
    digestFrequency: "weekly",
  },
})

export const useProfileStore = defineStore("profile", () => {
  const profile = ref<UserProfile>(defaultProfile())
  const settings = ref<CandidateSettings>(defaultSettings())
  const { email, fullName, role } = useSharedAuth()

  watchEffect(() => {
    if (role.value && role.value !== "candidate") return
    if (!profile.value.fullName && fullName.value) profile.value.fullName = fullName.value
    if (!profile.value.email && email.value) profile.value.email = email.value
  })

  const initials = computed(() => {
    if (!profile.value.fullName) return "?"
    return profile.value.fullName
      .split(" ")
      .slice(0, 2)
      .map(n => n[0]?.toUpperCase() ?? "")
      .join("")
  })

  const completionItems = computed(() => [
    { label: "Job title", done: !!profile.value.jobTitle },
    { label: "Location", done: !!profile.value.location },
    { label: "Bio", done: !!profile.value.bio },
    { label: "Skills added", done: profile.value.skills.length > 0 },
    { label: "Work preferences", done: profile.value.preferredJobTypes.length > 0 },
    { label: "Resume uploaded", done: !!profile.value.resumeName },
  ])

  const completionScore = computed(() => {
    const done = completionItems.value.filter(i => i.done).length
    return Math.round((done / completionItems.value.length) * 100)
  })

  return {
    profile,
    settings,
    initials,
    completionItems,
    completionScore,
  }
}, {
  persist: {
    key: "sainthr-careers:profile",
    pick: ["profile", "settings"],
  },
})
