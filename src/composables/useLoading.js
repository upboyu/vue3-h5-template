export function useLoading() {
  let loadingToast

  const openLoading = (text = '加载中...') => {
    loadingToast = showLoadingToast({
      message: text,
      forbidClick: true,
      duration: 0,
    })
  }

  const closeLoading = () => {
    loadingToast?.close?.()
  }

  return { openLoading, closeLoading }
}
