<script setup lang="ts">
import { BriefcaseBusiness } from "@lucide/vue"
import { SignIn } from "@clerk/nuxt/components";

defineOptions({ name: "AuthLoginForm" })

const props = withDefaults(
  defineProps<{
    redirectUrl?: string
    signUpUrl?: string
  }>(),
  {
    redirectUrl: "/",
    signUpUrl: "/auth/signup",
  },
)

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
        <div>
          <h1 class="font-display text-2xl font-semibold text-ink">
            Welcome back
          </h1>
          <p class="mt-1.5 text-sm text-muted">
            Sign in to your SaintHR account.
          </p>
        </div>
      </div>

      <div class="flex w-full justify-center">
        <SignIn
          routing="path"
          path="/auth/login"
          :appearance="clerkAppearance"
          :fallback-redirect-url="props.redirectUrl"
          :force-redirect-url="props.redirectUrl"
          :sign-up-url="props.signUpUrl"
          :sign-up-fallback-redirect-url="props.redirectUrl"
          :sign-up-force-redirect-url="props.redirectUrl"
        />
      </div>

      <slot />
    </div>
  </div>
</template>
