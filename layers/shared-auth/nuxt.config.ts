/// <reference path="../../types/clerk-nuxt.d.ts" />
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2026-05-18",
  modules: ["@clerk/nuxt"],
  clerk: {
    signInUrl: "/auth/login",
    signUpUrl: "/auth/signup",
    afterSignOutUrl: "/",
  },
})
