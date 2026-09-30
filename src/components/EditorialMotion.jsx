import { useEffect, useRef, useState } from 'react'

export function ScrollFillText({ children }) {
  const ref = useRef(null)
  const [progress, setProgress] = useState(0)
  const words = String(children).split(/\s+/)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect()
        const start = window.innerHeight * .85
        const end = window.innerHeight * .25
        setProgress(Math.max(0, Math.min(1, (start - rect.top) / (start - end + rect.height * .3))))
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [])

  return <p ref={ref} className="scroll-fill-text" aria-label={children}>{words.map((word, index) => <span key={index} aria-hidden="true" className={progress >= (index + .3) / words.length ? 'filled' : ''}>{word} </span>)}</p>
}

export function PlantCursor() {
  const ref = useRef(null)
  useEffect(() => {
    if (!window.matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)').matches) return
    const cursor = ref.current
    if (!cursor) return
    const move = (event) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
      cursor.classList.add('visible')
      cursor.classList.toggle('over-link', Boolean(event.target.closest('a, button, summary, select, [role="button"]')))
      cursor.classList.toggle('on-text', Boolean(event.target.closest('input, textarea, [contenteditable="true"]')))
    }
    const leave = () => cursor.classList.remove('visible')
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)
    return () => { window.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', leave) }
  }, [])
  return <span ref={ref} className="plant-cursor" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 19 19 5M8 5h11v11" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
}

export function LeafOrbit({ children, href, className = '' }) {
  return <a href={href} className={`leaf-orbit ${className}`}><span className="leaf-orbit-a" aria-hidden="true">✳</span><span className="leaf-orbit-b" aria-hidden="true">❧</span><span className="leaf-orbit-label">{children}</span><span className="leaf-orbit-c" aria-hidden="true">❧</span></a>
}

export function RevealFrame({ children, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const element = ref.current
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    element.classList.add('is-pending')
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.remove('is-pending')
        element.classList.add('is-visible')
        observer.disconnect()
      }
    }, { threshold: .12 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className={`reveal-frame ${className}`}>{children}</div>
}
