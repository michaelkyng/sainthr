import type { ModuleOptions as ClerkModuleOptions } from "@clerk/nuxt"

declare module "@nuxt/schema" {
  interface NuxtConfig {
    clerk?: Partial<ClerkModuleOptions> | false
  }
}

declare module "nuxt/schema" {
  interface NuxtConfig {
    clerk?: Partial<ClerkModuleOptions> | false
  }
}

export {}
