<template>
  <div class="flex min-h-screen bg-paper">
    <AdminSidebar />
    <div class="flex flex-1 flex-col overflow-hidden">
      <AdminHeader />
      <main class="flex-1 overflow-y-auto p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
