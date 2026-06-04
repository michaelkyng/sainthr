export default defineNuxtConfig({
  extends: ["../../layers/shared-utils"],
  compatibilityDate: "2026-05-18",
  srcDir: "app",
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  dir: {
    public: "../../public",
  },
  modules: ["@nuxt/eslint"],
  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
    },
  },
  app: {
    head: {
      title: "SaintHR",
      meta: [
        {
          name: "description",
          content:
            "SaintHR delivers HR services for recruitment, payroll, compliance, and employee growth.",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      careersUrl: process.env.NUXT_PUBLIC_CAREERS_URL ?? "http://localhost:3001",
    },
  },
})
