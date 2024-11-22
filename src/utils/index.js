export function storageToken() {
  const params = new URLSearchParams(
    window.location.search || window.location.hash.split('?').slice(1).join('&'),
  )
  const token = params.get('X-Token')
  const clientId = params.get('X-ClientId')
  const event = params.get('event')
  const source = params.get('source')

  if (token && clientId) {
    // 存储地址栏参数
    localStorage.setItem('X-Token', token)
    localStorage.setItem('X-ClientId', clientId)

    // 移除地址栏参数
    const url = new URL(window.location.href)
    url.search = ''
    url.hash = url.hash.split('?')[0]

    window.history.replaceState({}, '', url.href)
  }

  // 存储 event source
  localStorage.setItem('event', event)
  localStorage.setItem('source', source)
}

export function mixColors(color1, color2) {
  function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16)
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    }
  }

  function rgbToHex(r, g, b) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`
  }

  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)

  const mixedRgb = {
    r: Math.round((rgb1.r + rgb2.r) / 2),
    g: Math.round((rgb1.g + rgb2.g) / 2),
    b: Math.round((rgb1.b + rgb2.b) / 2),
  }

  return rgbToHex(mixedRgb.r, mixedRgb.g, mixedRgb.b)
}

export function loopWithRandomDelay(arr, callback, minDelay = 800, maxDelay = 1600) {
  arr = toRef(arr)

  const next = (i = 0) => {
    if (arr.value.length) {
      callback(arr.value[i])
      setTimeout(
        () => next((i + 1) % arr.value.length),
        Math.random() * (maxDelay - minDelay) + minDelay,
      )
    } else {
      watch(
        arr,
        () => {
          next()
        },
        { once: true },
      )
    }
  }

  next()
}

export function pxToReal(designPx) {
  const designWidth = 750 // 设计稿
  const deviceWidth = window.innerWidth
  return designPx * (deviceWidth / designWidth)
}
