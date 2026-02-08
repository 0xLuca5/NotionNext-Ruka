import { useGlobal } from '@/lib/global'
import { useEffect, useRef, useState } from 'react'
import SmartLink from '@/components/SmartLink'
/**
 * 文章详情的元信息
 * 标题、作者、分类、标签、创建日期等等。
 */
export const PostMeta = props => {
  const { post } = props
  const { locale } = useGlobal()
  const [summaryOpen, setSummaryOpen] = useState(false)
  const [animatedSummary, setAnimatedSummary] = useState('')
  const [typing, setTyping] = useState(false)
  const typingTimerRef = useRef(null)
  const aiSummary = post?.aiSummary || post?.summary

  useEffect(() => {
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current)
      typingTimerRef.current = null
    }

    if (!summaryOpen || !aiSummary) {
      setTyping(false)
      setAnimatedSummary('')
      return
    }

    const raw = String(aiSummary)
    let i = 0
    let canceled = false
    const baseDelay = 30
    const punctuationDelayMultiplier = 6

    setTyping(true)
    setAnimatedSummary('')

    const tick = () => {
      if (canceled) return
      const letter = raw.slice(i, i + 1)
      const isPunctuation = /[，。！、？,.!?]/.test(letter)
      const delay = isPunctuation ? baseDelay * punctuationDelayMultiplier : baseDelay
      setAnimatedSummary(raw.slice(0, i + 1))
      i++
      if (i >= raw.length) {
        setTyping(false)
        return
      }
      typingTimerRef.current = setTimeout(tick, delay)
    }

    typingTimerRef.current = setTimeout(tick, 120)
    return () => {
      canceled = true
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current)
        typingTimerRef.current = null
      }
    }
  }, [summaryOpen, aiSummary])

  return (
    <section className='mt-0 pb-0 mb-2 dark:border-white/10'>
      <div className='text-muted-foreground'>
        <nav className='flex flex-wrap items-center gap-1.5 text-sm font-medium leading-none tracking-tight'>
          <SmartLink href='/' passHref className='flex items-center gap-1.5 hover:underline'>
            <i className='fas fa-home text-xs' />
            <span>{locale?.NAV?.INDEX || '首页'}</span>
          </SmartLink>
          {post?.type !== 'Page' && post?.category && (
            <>
              <span className='px-1 opacity-50'>&gt;</span>
              <SmartLink
                href={`/category/${post?.category}`}
                passHref
                className='inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2 py-0.5 text-sm font-semibold text-primary hover:bg-primary/20'>
                <i className='fas fa-folder-open text-[10px]' />
                <span className='leading-none'>{post?.category}</span>
              </SmartLink>
            </>
          )}
        </nav>
        {post?.type === 'Post' && aiSummary && (
          <section className='mt-4 overflow-hidden rounded-xl bg-black/5 dark:bg-white/5'>
            <button
              type='button'
              onClick={() => setSummaryOpen(v => !v)}
              className='flex w-full items-center justify-between gap-3 px-4 py-3 text-left'>
              <div className='flex items-center gap-2 text-sm font-semibold text-foreground/80 dark:text-white/80'>
                <span className='inline-flex h-5 w-5 items-center justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='h-4 w-4 text-primary'>
                    <path d='M12 2l1.2 3.7a2 2 0 0 0 1.3 1.3L18 8.2l-3.5 1.2a2 2 0 0 0-1.3 1.3L12 14l-1.2-3.3a2 2 0 0 0-1.3-1.3L6 8.2 9.5 7a2 2 0 0 0 1.3-1.3L12 2z' />
                    <path d='M5 14l.7 2.2c.1.4.4.7.8.8L9 18l-2.5.9c-.4.1-.7.4-.8.8L5 22l-.7-2.3c-.1-.4-.4-.7-.8-.8L1 18l2.5-.8c.4-.1.7-.4.8-.8L5 14z' />
                  </svg>
                </span>
                <span>AI 摘要</span>
              </div>
              <span className='shrink-0 text-foreground/50 dark:text-white/50'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className={`h-4 w-4 transition-transform ${summaryOpen ? 'rotate-180' : ''}`}>
                  <path d='M6 9l6 6 6-6' />
                </svg>
              </span>
            </button>
            {summaryOpen && (
              <div className='px-4 pb-4 text-sm leading-relaxed text-foreground/70 dark:text-white/70 whitespace-pre-line'>
                {animatedSummary}
                {typing && (
                  <span className='ml-1 inline-block h-4 w-0.5 align-middle bg-current animate-pulse' />
                )}
              </div>
            )}
          </section>
        )}
      </div>
    </section>
  )
}
