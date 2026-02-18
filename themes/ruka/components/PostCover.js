'use client'

import LazyImage from '@/components/LazyImage'
import SmartLink from '@/components/SmartLink'
import WordCount from '@/components/WordCount'
import { siteConfig } from '@/lib/config'
import { formatDateFmt } from '@/lib/utils/formatDate'

import { WaveSvg } from './HomeCover'

const PostCover = props => {
  const { post, siteInfo } = props
  const title = post?.title || siteInfo?.title || siteConfig('TITLE')
  const description = post?.description || ''
  const ANALYTICS_BUSUANZI_ENABLE = siteConfig('ANALYTICS_BUSUANZI_ENABLE')
  const bannerImage =
    post?.pageCoverThumbnail ||
    post?.pageCover ||
    post?.pageCoverUrl ||
    siteInfo?.pageCover ||
    siteConfig('HOME_BANNER_IMAGE')

  const bannerImagePosition =
    typeof post?.pageCoverPosition === 'number'
      ? post.pageCoverPosition
      : typeof siteInfo?.pageCoverPosition === 'number'
        ? siteInfo.pageCoverPosition
        : 0.5

  const wordCount = Number.isFinite(post?.wordCount) ? post.wordCount : 0
  const readTime = Number.isFinite(post?.readTime) ? post.readTime : 0

  return (
    <div className='relative flex h-[60dvh] max-h-[800px] overflow-hidden'>
      <div className='absolute inset-0 h-full bg-black/40' />

      <div className='absolute inset-0 bottom-[8vh] flex flex-col items-center justify-center px-5 text-white'>
        <h1 className='shadow-text text-center text-xl/[1.2] md:text-5xl/[1.2] font-bold tracking-widest max-w-7xl'>
          {title}
        </h1>

        {description && <p className='shadow-text mt-4 text-sm'>= {description} =</p>}

        {post?.type !== 'Page' && (
          <section className='shadow-text-md flex flex-wrap items-center text-sm justify-center mt-4 text-white font-light leading-8 gap-x-2 gap-y-1'>
            <div className='flex flex-wrap justify-center'>
              <div className='mr-2'>
                <WordCount wordCount={wordCount} readTime={readTime} />
              </div>
              <div className='flex flex-nowrap items-center justify-center'>
                <SmartLink
                  href={`/archive#${formatDateFmt(post?.publishDate, 'yyyy-MM')}`}
                  passHref
                  className='pl-1 mr-2 cursor-pointer hover:underline whitespace-nowrap'>
                  <i className='fa-regular fa-calendar' /> {post?.publishDay}
                </SmartLink>
                <div className='pl-1 mr-2 whitespace-nowrap'>
                  <i className='fa-regular fa-calendar-check' /> {post?.lastEditedDay}
                </div>
                {ANALYTICS_BUSUANZI_ENABLE && (
                  <div className='busuanzi_container_page_pv font-light mr-2 whitespace-nowrap'>
                    <i className='fa-solid fa-fire-flame-curved' />{' '}
                    <span className='mr-2 busuanzi_value_page_pv' />
                  </div>
                )}
              </div>
            </div>
          </section>
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

export default PostCover
