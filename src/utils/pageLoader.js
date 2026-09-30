// Keep the plant visible while the first screen's images and fonts settle.
// Images below the fold are intentionally excluded.
export function finishPageLoading() {
  const loader = document.getElementById('page-loader')
  if (!loader) return

  requestAnimationFrame(() => requestAnimationFrame(async () => {
    const visibleImages = Array.from(document.querySelectorAll('#root img')).filter((image) => {
      const bounds = image.getBoundingClientRect()
      return bounds.top < window.innerHeight && bounds.bottom > 0
    })
    const imageReady = visibleImages.map((image) => {
      if (image.complete) return Promise.resolve()
      return new Promise((resolve) => {
        image.addEventListener('load', resolve, { once: true })
        image.addEventListener('error', resolve, { once: true })
      })
    })

    await Promise.race([
      Promise.all([document.fonts?.ready ?? Promise.resolve(), ...imageReady]),
      new Promise((resolve) => window.setTimeout(resolve, 2500)),
    ])

    loader.classList.add('is-leaving')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      loader.remove()
    } else {
      window.setTimeout(() => loader.remove(), 300)
    }
  }))
}
