<script setup lang="ts">
defineOptions({ name: "AdminLoginPage" })
definePageMeta({ layout: "auth" })

useHead({ title: "Sign in – SaintHR Admin" })

</script>

<template>
  <AuthLoginForm redirect-url="/dashboard" />
</template>
