<script setup lang="ts">
defineOptions({ name: "CareersSignupCatchAllPage" })
definePageMeta({ layout: "auth", middleware: "guest" })

useHead({ title: "Join SaintHR – Create your account" })

const route = useRoute()

type Role = "candidate" | "employer"
const SIGNUP_ROLE_KEY = "sainthr:signup-role"
const role = ref<Role>("candidate")

const parseRole = (v: unknown): Role | null =>
  v === "employer" || v === "candidate" ? v : null

onMounted(() => {
  const fromQuery = parseRole(route.query.role)
  const fromStorage = parseRole(sessionStorage.getItem(SIGNUP_ROLE_KEY))
  role.value = fromQuery ?? fromStorage ?? "candidate"
})

const redirectUrl = computed(() => (
  role.value === "employer" ? "/company/onboarding" : "/onboarding"
))
</script>

<template>
  <div class="w-full max-w-xl">
    <div class="mx-auto w-full max-w-md">
      <AuthSignupForm
        :role="role"
        :redirect-url="redirectUrl"
        sign-in-url="/auth/login"
      />
    </div>
  </div>
</template>
