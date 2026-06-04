<script setup lang="ts">
import { BriefcaseBusiness, Building2, UserRound } from "@lucide/vue"
import { computed } from "vue";
import { SignUp } from "@clerk/nuxt/components";

defineOptions({ name: "AuthSignupForm" })

type AuthRole = "candidate" | "employer"

const props = withDefaults(
  defineProps<{
    role?: AuthRole | null
    redirectUrl?: string
    signInUrl?: string
  }>(),
  {
    role: null,
    redirectUrl: "/",
    signInUrl: "/auth/login",
  },
)

const roleCopy = computed(() => {
  if (props.role === "employer") {
    return {
      icon: Building2,
      badge: "bg-[#e8eeff] text-[#3b55c4]",
      label: "Employer",
      title: "Create your employer account",
      description: "Set up your account, then add your companies.",
    }
  }

  return {
    icon: UserRound,
    badge: "bg-mint text-green",
    label: "Job Seeker",
    title: "Create your profile",
    description: "Find vetted HR roles from top employers.",
  }
})

const unsafeMetadata = computed(() => (props.role ? { role: props.role } : undefined))

const clerkAppearance = {
  variables: {
    colorPrimary: "#101e44",
    colorText: "#101e44",
    colorTextSecondary: "#667085",
    borderRadius: "0.875rem",
    fontFamily: "inherit",
  },
  elements: {
    rootBox: "w-full",
    cardBox: "w-full shadow-none",
    card: "w-full border-0 bg-transparent p-0 shadow-none",
    header: "hidden",
    footer: "hidden",
    main: "w-full gap-4",
    form: "w-full flex flex-col gap-4",
    formFieldRow: "w-full",
    formField: "w-full",
    formFieldLabel: "text-sm font-medium text-ink",
    formFieldInput:
      "w-full border-line bg-paper text-ink shadow-none focus:border-green focus:ring-green/10",
    formButtonPrimary:
      "w-full bg-ink text-white shadow-none hover:bg-ink-2 focus:shadow-none normal-case",
    socialButtons: "w-full flex flex-col gap-2",
    socialButtonsBlockButton:
      "w-full border-line bg-white text-ink shadow-none hover:bg-paper",
    socialButtonsBlockButtonText: "font-medium",
    dividerRow: "w-full my-1",
    dividerLine: "bg-line",
    dividerText: "text-muted text-xs",
    identityPreview: "w-full",
    formFieldAction: "text-green hover:text-ink",
    footerActionLink: "text-green hover:text-ink",
  },
}
</script>

<template>
  <div class="relative mx-auto w-full max-w-md">
    <div
      class="flex flex-col rounded-3xl border border-white/20 bg-panel/95 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.28)] backdrop-blur sm:p-8"
    >
      <div class="mb-8 flex flex-col items-center gap-3 text-center">
        <NuxtLink to="/" class="flex items-center gap-2.5 text-ink">
          <span
            class="grid size-11 place-items-center rounded-2xl bg-ink text-white shadow-lg shadow-ink/15"
          >
            <BriefcaseBusiness class="size-5" />
          </span>
          <span class="font-display text-xl font-semibold">SaintHR</span>
        </NuxtLink>
        <div class="flex flex-col items-center gap-2">
          <div :class="['inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold', roleCopy.badge]">
            <component :is="roleCopy.icon" class="size-3.5" />
            {{ roleCopy.label }}
          </div>
          <h1 class="font-display text-2xl font-semibold text-ink">
            {{ roleCopy.title }}
          </h1>
          <p class="text-sm text-muted">
            {{ roleCopy.description }}
          </p>
        </div>
      </div>

      <div class="flex w-full justify-center">
        <SignUp
          routing="path"
          path="/auth/signup"
          :appearance="clerkAppearance"
          :fallback-redirect-url="props.redirectUrl"
          :force-redirect-url="props.redirectUrl"
          :sign-in-url="props.signInUrl"
          :sign-in-fallback-redirect-url="props.redirectUrl"
          :sign-in-force-redirect-url="props.redirectUrl"
          :unsafe-metadata="unsafeMetadata"
        />
      </div>
    </div>
  </div>
</template>
