<template>
  <div class="flex min-h-screen flex-col bg-paper">
    <AppNavbar />
    <main class="flex-1 pt-20">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
