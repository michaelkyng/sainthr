export const useAppLinks = () => {
  const config = useRuntimeConfig()
  const careersUrl = computed(() => config.public.careersUrl || "/careers")

  const routePath = (path?: string) => {
    if (path === "/careers") {
      return careersUrl.value
    }

    return path ?? "/"
  }

  return {
    careersUrl,
    routePath,
  }
}
