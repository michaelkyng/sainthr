<script setup lang="ts">
defineOptions({ name: "AdminLoginPage" })
definePageMeta({ layout: "auth" })

useHead({ title: "Sign in – SaintHR Admin" })

const router = useRouter()
</script>

<template>
  <AuthLoginForm @submit="router.push('/dashboard')" />
</template>
