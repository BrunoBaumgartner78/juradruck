// src/components/HeroParallaxBackground.tsx
'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'

type LogoSpec = {
  id: number
  x: number
  y: number
  size: number
  depth: number
  delay: number
  flip: boolean
}

type Props = {
  count?: number
  minSize?: number
  maxSize?: number
  parallaxStrength?: number
  sources?: string[]
  className?: string
}

export default function HeroParallaxBackground({
  count = 18,
  minSize = 36,
  maxSize = 110,
  parallaxStrength = 22,
  sources = ['/logos/juradruck_logo.webp'],
  className = '',
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [seed, setSeed] = useState<number | null>(null)

  useEffect(() => {
    const arr = new Uint32Array(1)
    window.crypto.getRandomValues(arr)
    setSeed(arr[0] / 2 ** 32)
    setMounted(true)
  }, [])

  const rng = useMemo(() => {
    if (seed == null) return null
    let s = Math.floor(seed * 1_000_003) || 123457
    return () => (s = (1664525 * s + 1013904223) % 2 ** 32) / 2 ** 32
  }, [seed])

  const logos = useMemo<LogoSpec[]>(() => {
    if (!rng) return []
    const arr: LogoSpec[] = []
    for (let i = 0; i < count; i++) {
      const r1 = rng(), r2 = rng(), r3 = rng(), r4 = rng()
      const size = Math.round(minSize + r1 * (maxSize - minSize))
      arr.push({
        id: i,
        x: Math.round(r2 * 100),
        y: Math.round(r3 * 100),
        size,
        depth: 0.35 + r4 * 0.65,
        delay: Math.floor(rng() * 240),
        flip: rng() > 0.5,
      })
    }
    return arr
  }, [rng, count, minSize, maxSize])

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let mouseX = 0, mouseY = 0, scrollY = 0
    let active = false

    const applyTransforms = () => {
      raf = 0
      if (!active) return
      const nodes = el.querySelectorAll<HTMLDivElement>('[data-logo]')
      const s = parallaxStrength
      for (const node of nodes) {
        const depth = Number(node.dataset.depth || 0.5)
        const tx = (mouseX * 12 + scrollY * 20) * depth * (s / 24)
        const ty = (mouseY * 10 + scrollY * 40) * depth * (s / 24)
        node.style.transform = `translate(-50%, -50%) translate3d(${tx}px, ${ty}px, 0)`
        node.style.willChange = 'transform'
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      mouseX = (e.clientX - rect.left - rect.width / 2) / rect.width
      mouseY = (e.clientY - rect.top - rect.height / 2) / rect.height
      if (!raf) raf = requestAnimationFrame(applyTransforms)
    }

    const onScroll = () => {
      scrollY = window.scrollY / Math.max(1, window.innerHeight)
      if (!raf) raf = requestAnimationFrame(applyTransforms)
    }

    const io = new IntersectionObserver(([entry]) => {
      active = !!entry?.isIntersecting
      if (active && !raf) raf = requestAnimationFrame(applyTransforms)
    })
    io.observe(el)

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      io.disconnect()
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [parallaxStrength])

  return (
    <div
      ref={wrapperRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-10 overflow-hidden ${className}`}
    >
      {/* Radialer Tint */}
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.06),transparent_60%)]
          dark:bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.18),transparent_60%)]
        "
      />
      {mounted && logos.map((l) => {
        const src = (sources?.length ? sources : ['/logos/juradruck_logo.webp'])[l.id % (sources?.length || 1)]
        return (
          <div
            key={l.id}
            data-logo
            data-depth={l.depth}
            className="
              absolute
              transition-transform duration-300 ease-out
              motion-reduce:transition-none
            "
            style={{
              left: `${l.x}%`,
              top: `${l.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              className="opacity-0 animate-fadeInQuick motion-reduce:animate-none"
              style={{ animationDelay: `${l.delay}ms` }}
            >
              <div
                className="transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.03] motion-reduce:transition-none"
                style={{
                  width: l.size,
                  height: l.size,
                  transformOrigin: 'center',
                  animation: `drift ${8 + l.depth * 4}s ease-in-out infinite`,
                  filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.20))',
                }}
              >
                <Image
                  src={src}
                  alt="JuraDruck Logo"
                  width={l.size}
                  height={l.size}
                  draggable={false}
                  className="opacity-90"
                  style={{ transform: l.flip ? ('scaleX(-1)' as any) : 'none' }}
                />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
