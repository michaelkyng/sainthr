<script setup lang="ts">
defineOptions({ name: "CareersLoginCatchAllPage" })
definePageMeta({ layout: "auth", middleware: "guest" })

useHead({ title: "Sign in – SaintHR Careers" })
</script>

<template>
  <div class="w-full max-w-md">
    <AuthLoginForm redirect-url="/auth/continue" />
  </div>
</template>
