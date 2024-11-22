export function useLoading() {
  let loadingToast

  const openLoading = () => {
    loadingToast = showLoadingToast({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    })
  }

  const closeLoading = () => {
    loadingToast?.close?.()
  }

  return { openLoading, closeLoading }
}
