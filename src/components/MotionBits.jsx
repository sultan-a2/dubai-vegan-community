import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

function useVisible(ref, once = true) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!ref.current || !('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        if (once) observer.disconnect()
      } else if (!once) setVisible(false)
    }, { threshold: 0.16 })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, once])
  return visible
}

export function SlideUpText({ children, as: Tag = 'span', className = '', ...props }) {
  const ref = useRef(null)
  const visible = useVisible(ref)
  const reduced = useReducedMotion()
  const words = String(children).split(/(\s+)/)
  return <Tag ref={ref} className={`slide-up-text ${className}`} aria-label={children} {...props}>
    {words.map((word, index) => word.trim()
      ? <span className="slide-up-word" aria-hidden="true" key={index}><span style={{ '--word-index': index, transform: reduced || visible ? 'translateY(0)' : 'translateY(110%)', opacity: reduced || visible ? 1 : 0 }}>{word}</span></span>
      : <span aria-hidden="true" key={index}>{word}</span>)}
  </Tag>
}

export function GradientWaveText({ children, className = '' }) {
  const ref = useRef(null)
  const visible = useVisible(ref)
  return <span ref={ref} className={`gradient-wave-text ${visible ? 'is-visible' : ''} ${className}`}>{children}</span>
}

export function Signature({ text, className = '' }) {
  const ref = useRef(null)
  const visible = useVisible(ref)
  return <span ref={ref} className={`signature-text ${visible ? 'is-visible' : ''} ${className}`}>{text}</span>
}

export function ParallaxImage({ src, alt, className = '', loading = 'lazy' }) {
  const ref = useRef(null)
  useEffect(() => {
    const element = ref.current
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect()
        const distance = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight
        element.style.setProperty('--parallax-y', `${Math.max(-28, Math.min(28, distance * -32))}px`)
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])
  return <div ref={ref} className={`parallax-image ${className}`}><img src={src} alt={alt} loading={loading} /></div>
}

export function CopyButton({ value }) {
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (!copied) return
    const timeout = window.setTimeout(() => setCopied(false), 2200)
    return () => window.clearTimeout(timeout)
  }, [copied])
  return <button className="copy-button" type="button" onClick={async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }} aria-label={`Copy ${value}`}>{copied ? 'Copied' : 'Copy code'}</button>
}
