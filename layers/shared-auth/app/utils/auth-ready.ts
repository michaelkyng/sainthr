export const ensureAuthReady = async () => {
  if (import.meta.server) return null

  const auth = useSharedAuth()
  if (auth.isLoaded.value) return auth

  await new Promise<void>((resolve) => {
    const stop = watch(
      auth.isLoaded,
      (loaded) => {
        if (loaded) {
          stop()
          resolve()
        }
      },
      { immediate: true },
    )
  })
  return auth
}
