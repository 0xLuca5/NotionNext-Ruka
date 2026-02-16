'use client'

import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import { isBrowser, loadExternalResource } from '@/lib/utils'
import { useEffect, useRef } from 'react'
import CONFIG from '../config'

export const WaveSvg = () => {
  return (
    <div className='wave-wrap'>
      <svg
        className='wave'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 24 150 28'
        preserveAspectRatio='none'
        aria-hidden='true'>
        <defs>
          <path
            id='gentle-wave'
            d='m -160,44.4 c 30,0 58,-18 87.7,-18 30.3,0 58.3,18 87.3,18 30,0 58,-18 88,-18 30,0 58,18 88,18 l 0,34.5 -351,0 z'
          />
        </defs>
        <g className='parallax'>
          <use xlinkHref='#gentle-wave' x='50' y='0' />
          <use xlinkHref='#gentle-wave' x='50' y='3' />
          <use xlinkHref='#gentle-wave' x='50' y='6' />
        </g>
      </svg>
    </div>
  )
}

export default function HomeCover(props) {
  const typedRef = useRef(null)

  const isNonHome = Boolean(props?.title)

  const title = props?.title || props?.siteInfo?.title || siteConfig('TITLE')
  const description =
    props?.description || props?.siteInfo?.description || siteConfig('DESCRIPTION')
  const bannerImage =
    props?.siteInfo?.pageCover || siteConfig('HOME_BANNER_IMAGE')

  const greetingWordsValue = siteConfig('GREETING_WORDS', '', CONFIG)

  const bannerImagePosition =
    typeof props?.siteInfo?.pageCoverPosition === 'number'
      ? props.siteInfo.pageCoverPosition
      : 0.5

  useEffect(() => {
    if (!isBrowser) return
    if (isNonHome) return

    const GREETING_WORDS = String(greetingWordsValue || '')
      .split(/,|，|\n/)
      .map(s => s.trim())
      .filter(Boolean)

    let canceled = false

    if (GREETING_WORDS.length > 0 && document.getElementById('typed-ruka')) {
      loadExternalResource('/js/typed.min.js', 'js').then(() => {
        if (canceled) return

        if (window.Typed && !typedRef.current) {
          typedRef.current = new window.Typed('#typed-ruka', {
            strings: GREETING_WORDS,
            typeSpeed: 200,
            backSpeed: 100,
            backDelay: 400,
            showCursor: true,
            smartBackspace: true
          })
        }
      })
    }

    return () => {
      canceled = true
      if (typedRef.current?.destroy) {
        typedRef.current.destroy()
      }
      typedRef.current = null
    }
  }, [greetingWordsValue, isNonHome])

  return (
    <div className='relative flex h-[60dvh] max-h-[800px] overflow-hidden'>
      <div className='absolute inset-0 h-full bg-black/40' />
      <div className='absolute inset-0 bottom-[8vh] flex flex-col items-center justify-center px-5 text-white'>
        <h1 className='shadow-text text-center text-4xl/[1.2] md:text-5xl/[1.2] font-bold tracking-widest max-w-7xl'>
          {title}
        </h1>
        {!isNonHome && description && (
          <p className='shadow-text mt-4 text-sm'>= {description} =</p>
        )}
        {!isNonHome && (
          <div className='shadow-text mt-5 text-sm h-6 flex items-center justify-center'>
            <span id='typed-ruka' />
          </div>
        )}
      </div>
      <div className='hero-bottom-fade absolute inset-x-0 bottom-0 h-28' />
      <div className='relative -z-10 h-full min-h-60 w-full'>
        <LazyImage
          src={bannerImage}
          className='h-full w-full object-cover'
          style={{ objectPosition: `50% ${(1 - bannerImagePosition) * 100}%` }}
          alt='cover'
        />
      </div>
      <WaveSvg />
    </div>
  )
}
