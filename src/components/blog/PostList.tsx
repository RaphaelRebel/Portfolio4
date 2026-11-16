'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCursor } from '@/components/cursor/CursorProvider'
import type { Post } from '@/content/types'
import { cn } from '@/lib/cn'
import { formatIndex } from '@/lib/format'
import { stripLinks } from '@/lib/post-body'
import { getPostHref } from '@/lib/routes'
import { labelClass } from '@/lib/styles'

type PostListProps = {
  posts: readonly Post[]
}

type PostRowProps = {
  post: Post
  index: number
  isActive: boolean
  isDimmed: boolean
  onActivate: (index: number) => void
  onDeactivate: () => void
}

const titleLayerClass =
  'pb-[0.06em] [grid-area:1/1] transition-[transform,opacity] duration-[650ms] ease-in-out-strong'

const PostRow = ({ post, index, isActive, isDimmed, onActivate, onDeactivate }: PostRowProps) => {
  const { setCursorLabel } = useCursor()

  const handleActivate = () => {
    setCursorLabel('Lees post')
    onActivate(index)
  }

  const handleDeactivate = () => {
    setCursorLabel(null)
    onDeactivate()
  }

  return (
    <li className={cn('border-t border-line transition-opacity duration-300', { 'opacity-30': isDimmed })}>
      <Link
        href={getPostHref(post.slug)}
        onPointerEnter={handleActivate}
        onPointerLeave={handleDeactivate}
        onFocus={handleActivate}
        onBlur={handleDeactivate}
        className="flex flex-col gap-4 py-[clamp(28px,3vw,48px)] text-ink no-underline"
      >
        <span className="flex flex-wrap items-baseline gap-x-[clamp(16px,2vw,32px)] gap-y-3.5">
          <span className={cn(labelClass, 'w-[52px] flex-none tabular-nums')}>{formatIndex(index + 1)}</span>
          <span className="grid min-w-[min(100%,260px)] flex-1 overflow-hidden text-[clamp(30px,4.6vw,88px)] leading-none [overflow-wrap:anywhere]">
            <span
              className={cn(titleLayerClass, 'font-serif font-extralight uppercase tracking-[-0.01em]', {
                '-translate-y-[105%] opacity-0': isActive,
              })}
            >
              {post.title}
            </span>
            <span
              aria-hidden="true"
              className={cn(titleLayerClass, 'translate-y-[105%] font-grotesk font-extrabold tracking-[-0.045em] opacity-0', {
                'translate-y-0 opacity-100 delay-50': isActive,
              })}
            >
              {post.title}
            </span>
          </span>
          <span className={cn(labelClass, 'ml-auto flex gap-4 tabular-nums')}>
            <span>{post.year}</span>
            <span>{post.readTime}</span>
          </span>
        </span>
        <span className="block max-w-[60ch] text-[17px] leading-[1.45] text-ink-muted md:pl-[66px]">
          {stripLinks(post.excerpt)}
        </span>
      </Link>
    </li>
  )
}

export const PostList = ({ posts }: PostListProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const handleActivate = (index: number) => setActiveIndex(index)
  const handleDeactivate = () => setActiveIndex(null)

  if (posts.length === 0) {
    return <p className="m-0 mt-[clamp(56px,6vw,88px)] text-[17px] text-ink-muted">Nog geen posts.</p>
  }

  return (
    <ol className="m-0 mt-[clamp(56px,6vw,88px)] list-none border-b border-line p-0">
      {posts.map((post, index) => (
        <PostRow
          key={post.slug}
          post={post}
          index={index}
          isActive={activeIndex === index}
          isDimmed={activeIndex !== null && activeIndex !== index}
          onActivate={handleActivate}
          onDeactivate={handleDeactivate}
        />
      ))}
    </ol>
  )
}
