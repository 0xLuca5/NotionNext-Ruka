'use client'

import SmartLink from '@/components/SmartLink'
import { isBrowser } from '@/lib/utils'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

export default function TagIndexPage(props) {
  const { tagOptions } = props

  const router = useRouter()

  const handleWordClick = e => {
    e?.preventDefault?.()
    e?.stopPropagation?.()

    const span = e?.target?.closest?.('span')
    const name = span?.textContent?.trim?.()
    if (!name) return

    const encoded = encodeURIComponent(name)
    const isTag = Array.isArray(tagOptions)
      ? tagOptions.some(t => t?.name === name)
      : false
    const href = isTag ? `/tag/${encoded}` : `/category/${encoded}`

    if (router?.push) {
      router.push(href)
    } else {
      window.location.href = href
    }
  }

  const cloudWrapRef = useRef(null)
  const cloudCanvasRef = useRef(null)
  const cloudHtmlRef = useRef(null)
  const cloudLibRef = useRef(null)
  const [cloudReady, setCloudReady] = useState(false)
  const [fontReady, setFontReady] = useState(false)

  useEffect(() => {
    if (!isBrowser) return
    const id = 'ruka-wordcloud-finger-paint-font'
    let link = document.getElementById(id)
    if (!link) {
      link = document.createElement('link')
      link.id = id
      link.rel = 'stylesheet'
      link.href = 'https://fonts.googleapis.com/css?family=Finger+Paint'
      document.head.appendChild(link)
    }

    const styleId = 'ruka-wordcloud-hover-style'
    let styleEl = document.getElementById(styleId)
    if (!styleEl) {
      styleEl = document.createElement('style')
      styleEl.id = styleId
      styleEl.textContent = `
#ruka-wordcloud-html > span {
  display: inline-block;
  cursor: pointer;
  scale: 1;
  transition: scale 160ms ease, text-shadow 160ms ease;
}
#ruka-wordcloud-html > span:hover {
  scale: 1.22;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.35);
  z-index: 5;
}
`
      document.head.appendChild(styleEl)
    }

    let canceled = false
    const waitForFont = async () => {
      try {
        if (document?.fonts?.load) {
          await document.fonts.load('16px "Finger Paint"')
          await document.fonts.ready
        }
      } catch {
        // ignore
      } finally {
        if (!canceled) setFontReady(true)
      }
    }

    waitForFont()

    return () => {
      canceled = true
      const el = document.getElementById(id)
      el?.parentNode?.removeChild?.(el)

      const cssEl = document.getElementById(styleId)
      cssEl?.parentNode?.removeChild?.(cssEl)
    }
  }, [])

  useEffect(() => {
    if (!isBrowser) return
    let canceled = false

    const ensureWordCloud = async () => {
      if (cloudLibRef.current) return
      const m = await import('wordcloud')
      cloudLibRef.current = m?.default || m?.WordCloud || m
    }

    ensureWordCloud()
      .then(() => {
        if (!canceled) setCloudReady(typeof cloudLibRef.current === 'function')
      })
      .catch(() => {
        if (!canceled) setCloudReady(false)
      })

    return () => {
      canceled = true
    }
  }, [])

  useEffect(() => {
    if (!isBrowser) return
    if (!cloudReady) return
    if (!fontReady) return
    if (!Array.isArray(tagOptions) || tagOptions.length === 0) return
    if (!cloudWrapRef.current || !cloudCanvasRef.current) return
    if (!cloudHtmlRef.current) return
    const WordCloud = cloudLibRef.current
    if (typeof WordCloud !== 'function') return

    const dppx =
      typeof window !== 'undefined' && window.devicePixelRatio
        ? window.devicePixelRatio
        : 1

    const counts = tagOptions
      .map(t => Number(t?.count) || 1)
      .filter(n => Number.isFinite(n) && n > 0)

    const maxCount = counts.length > 0 ? Math.max(...counts) : 1
    const minCount = counts.length > 0 ? Math.min(...counts) : 1
    const denom = Math.max(1, Math.log(maxCount + 1) - Math.log(minCount + 1))

    const list = tagOptions
      .map(t => {
        const name = t?.name
        const raw = Number(t?.count) || 1
        const norm = (Math.log(raw + 1) - Math.log(minCount + 1)) / denom
        const scaled = Math.round(4 + norm * 22)
        return [name, scaled]
      })
      .filter(([name]) => Boolean(name))

    if (list.length === 0) return

    let raf = 0

    const render = () => {
      const wrap = cloudWrapRef.current
      const canvas = cloudCanvasRef.current
      const htmlCanvas = cloudHtmlRef.current
      if (!wrap || !canvas) return
      if (!htmlCanvas) return

      const isDarkTheme =
        typeof document !== 'undefined' &&
        document.documentElement?.classList?.contains('dark')

      const width = Math.max(280, wrap.clientWidth || 0)
      const height = Math.max(360, Math.round(width * 0.62))

      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'

      const pixelWidth = Math.floor(width * dppx)
      const pixelHeight = Math.floor(height * dppx)
      if (canvas.width !== pixelWidth) canvas.width = pixelWidth
      if (canvas.height !== pixelHeight) canvas.height = pixelHeight

      htmlCanvas.style.width = pixelWidth + 'px'
      htmlCanvas.style.height = pixelHeight + 'px'
      htmlCanvas.style.transformOrigin = '0 0'
      htmlCanvas.style.transform = dppx !== 1 ? `scale(${1 / dppx})` : ''

      htmlCanvas.innerHTML = ''

      const baseGridSize = 26
      const baseWeightFactor = 3
      const gridSize = baseGridSize * dppx
      const weightFactor = baseWeightFactor * dppx

      try {
        WordCloud([canvas, htmlCanvas], {
          list,
          gridSize,
          weightFactor,
          shape: 'square',
          ellipticity: 1,
          minSize: 8,
          shuffle: true,
          drawMask: false,
          maskGapWidth: 0.3,
          wait: 0,
          abortThreshold: 5000,
          fontFamily: 'Finger Paint, cursive, sans-serif',
          color: (word, weight) => {
            const palette = isDarkTheme
              ? ['#f0f0c0', '#e6f7ff', '#d6f5d6', '#ffe4e6', '#fde68a', '#e9d5ff']
              : ['#0f172a', '#1f2937', '#0f766e', '#1d4ed8', '#7c2d12', '#6d28d9']
            let hash = 0
            const s = String(word || '')
            for (let i = 0; i < s.length; i++) {
              hash = (hash * 31 + s.charCodeAt(i)) >>> 0
            }
            const idx = palette.length ? hash % palette.length : 0
            return palette[idx]
          },
          backgroundColor: 'rgba(0,0,0,0)',
          rotateRatio: 0.28,
          rotationSteps: 2,
          minRotation: -Math.PI / 4,
          maxRotation: Math.PI / 4,
          drawOutOfBound: false
        })
      } catch {
        // ignore
      }
    }

    const schedule = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(render)
    }

    schedule()

    window.addEventListener('resize', schedule)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('resize', schedule)
    }
  }, [cloudReady, fontReady, tagOptions, router?.query?.wc])

  return (
    <>
      <div id='tags-list' className='duration-200 flex flex-wrap mb-4'>
        {tagOptions.map(tag => (
          <div key={tag.name} className='p-2'>
            <SmartLink
              key={tag}
              href={`/tag/${encodeURIComponent(tag.name)}`}
              passHref
              className='cursor-pointer inline-block rounded bg-transparent text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.12)] duration-200 mr-2 py-1 px-2 text-[10px] md:text-xs whitespace-nowrap hover:shadow-xl dark:hover:bg-[hsl(var(--primary)/0.16)]'>
              <div className='font-light dark:text-gray-400'>
                <i className='mr-1 fas fa-tag' />{' '}
                {tag.name + (tag.count ? `(${tag.count})` : '')}{' '}
              </div>
            </SmartLink>
          </div>
        ))}
      </div>

      <div ref={cloudWrapRef} className='w-full mb-6 overflow-hidden relative'>
        <canvas ref={cloudCanvasRef} className='hidden' />
        <div
          id='ruka-wordcloud-html'
          ref={cloudHtmlRef}
          className='block relative'
          onClickCapture={handleWordClick}
        />
        <div
          className='pointer-events-none absolute inset-0'
          style={{
            background:
              'radial-gradient(circle at 50% 45%, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0) 42%, rgba(0,0,0,0) 100%)'
          }}
        />
      </div>
    </>
  )
}
