import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import BeiAnSite from '@/components/BeiAnSite'
import DarkModeButton from '@/components/DarkModeButton'
import BLOG from '@/blog.config'

export const Footer = props => {
  const {
    postCount,
    siteInfo,
    totalWords: totalWordsProp,
    hasSider,
    layoutSidebarReverse
  } = props

  const totalWords = Number.isFinite(totalWordsProp)
    ? totalWordsProp
    : Number(totalWordsProp)
  const totalWordsValue = Number.isFinite(totalWords) ? totalWords : 0

  const totalReadTime = totalWordsValue > 0 ? Math.floor(totalWordsValue / 400) + 1 : 0

  const formattedWords =
    totalWordsValue >= 10000
      ? `${(totalWordsValue / 10000).toFixed(1)}w`
      : `${totalWordsValue}`

  const formattedTime =
    totalReadTime >= 60
      ? `${Math.round(totalReadTime / 60)}h`
      : `${Math.round(totalReadTime)}m`

  const currentYear = new Date().getFullYear()
  const startYear = BLOG.SINCE ? Number(BLOG.SINCE) : currentYear

  return (
    <footer className='mt-auto pb-6'>
      <div className={`relative mx-auto md:flex ${hasSider ? 'max-w-7xl' : 'max-w-7xl'} ${layoutSidebarReverse ? 'flex-row-reverse' : ''}`}>
        {hasSider && (
          <div className='hidden md:block w-64 min-w-64 max-w-64 px-2' />
        )}

        <div className={`${hasSider ? 'min-w-0 grow' : ''} w-full px-6 md:px-6 md:pb-10`}>
          <div className='flex flex-col items-center gap-3 md:px-0'>
            <div className='text-muted-foreground flex flex-wrap items-center justify-center gap-6 text-sm md:gap-4'>
              <button
                className='flex items-center gap-2 opacity-75 transition-opacity duration-300 hover:opacity-100'
                title='站点总字数'>
                <i className='fas fa-file-alt' />
                <span className='font-medium'>{formattedWords}</span>
                <span className='text-xs'>字</span>
              </button>

              <div className='bg-muted-foreground/30 h-4 w-px'></div>

              <button
                className='flex items-center gap-2 opacity-75 transition-opacity duration-300 hover:opacity-100'
                title='站点阅读时长'>
                <i className='fas fa-clock' />
                <span className='font-medium'>{formattedTime}</span>
              </button>

              <div className='bg-muted-foreground/30 h-4 w-px'></div>

              <button
                className='flex items-center gap-2 opacity-75 transition-opacity duration-300 hover:opacity-100'
                title='文章总数'>
                <i className='fas fa-pen-nib' />
                <span className='font-medium'>{postCount || 0}</span>
                <span className='text-xs'>篇</span>
              </button>
            </div>

            <div className='text-muted-foreground flex items-center gap-0.5 text-sm'>
              <span className='opacity-75'>©</span>
              <span className='font-medium opacity-75'>{startYear}</span>
              {startYear !== currentYear && (
                <>
                  <span className='opacity-50'>-</span>
                  <span className='font-medium opacity-75'>{currentYear}</span>
                </>
              )}
              <span className='mx-1 opacity-75'>·</span>
              <span className='author font-medium opacity-75'>
                {siteInfo?.title || BLOG.AUTHOR}
              </span>
            </div>

            <div className='text-muted-foreground/80 flex items-center gap-2 text-xs'>
              <span className='opacity-75'>Powered by theme</span>
              <a
                href='https://github.com/0xLuca5/NotionNext-Ruka'
                target='_blank'
                rel='noreferrer'
                className='footer-link font-medium transition-all duration-300'>
                NotionNext-Ruka
              </a>
            </div>

            <div className='text-center text-xs'>
              <div className='flex flex-wrap justify-center'>
                <BeiAnSite />
                <BeiAnGongAn />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
