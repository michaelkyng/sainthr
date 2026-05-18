<script setup lang="ts">
// This route no longer exists — employer signup is handled by /auth/signup?role=employer
const router = useRouter()
onMounted(() => router.push("/auth/signup?role=employer"))
</script>

<template><div /></template>
