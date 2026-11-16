import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AuthorLine } from '@/components/blog/AuthorLine'
import { PostBody } from '@/components/blog/PostBody'
import { CursorLink } from '@/components/cursor/CursorLink'
import { PageTopBar } from '@/components/layout/PageTopBar'
import { nextLinkClass } from '@/components/projects/ProjectDetail'
import { DetailGallery, DetailImage } from '@/components/ui/DetailImages'
import { cn } from '@/lib/cn'
import { formatIndex, padNumber } from '@/lib/format'
import { stripLinks } from '@/lib/post-body'
import { getPostHref } from '@/lib/routes'
import { labelClass } from '@/lib/styles'
import { getPostBySlug, getPostNeighbours, getPosts } from '@/server/queries'

type PostPageProps = {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = async () => {
  const posts = await getPosts()
  return posts.map(({ slug }) => ({ slug }))
}

export const generateMetadata = async ({ params }: PostPageProps): Promise<Metadata> => {
  const post = await getPostBySlug((await params).slug)
  if (!post) return {}
  return {
    title: post.title,
    description: stripLinks(post.excerpt),
    openGraph: post.coverImage.src ? { images: [{ url: post.coverImage.src, alt: post.coverImage.alt }] } : undefined,
  }
}

const PostPage = async ({ params }: PostPageProps) => {
  const { slug } = await params
  const [post, neighbours] = await Promise.all([getPostBySlug(slug), getPostNeighbours(slug)])
  if (!post || !neighbours) notFound()

  const { next, nextPosition, position, total } = neighbours

  return (
    <article aria-labelledby="h-post" className="px-gutter pt-[calc(var(--spacing-header)+clamp(32px,5vw,80px))]">
      <PageTopBar backHref="/blog" backLabel="Alle posts" aside={`( Post ${padNumber(position)}/${padNumber(total)} )`} />
      <h1
        id="h-post"
        lang="nl"
        className="m-0 mt-[clamp(32px,5vw,72px)] max-w-[20ch] hyphens-auto font-grotesk text-[clamp(34px,6.4vw,104px)] font-extrabold leading-[0.98] tracking-[-0.035em] [overflow-wrap:break-word]"
      >
        {post.title}
      </h1>
      <div className={cn(labelClass, 'mt-7 flex flex-wrap items-center gap-x-6 gap-y-4 border-y border-line py-5 tabular-nums')}>
        <span>{post.year}</span>
        <span>{post.readTime} leestijd</span>
        {post.tags.length > 0 && (
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0 md:ml-auto">
            {post.tags.map((tag) => (
              <li key={tag} className="inline-flex items-center whitespace-nowrap rounded-full border border-ink px-3 py-[3px]">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
      <AuthorLine />
      <DetailImage image={post.coverImage} className="mt-[clamp(40px,5vw,72px)]" />
      <PostBody body={post.body} />
      <DetailGallery images={post.gallery} className="mt-[clamp(56px,7vw,100px)]" />
      {total > 1 && (
        <CursorLink href={getPostHref(next.slug)} cursorLabel="Volgende post" className={nextLinkClass}>
          <span className={cn(labelClass, 'block font-bold')}>Volgende post {formatIndex(nextPosition)}</span>
          <span className="mt-5 flex items-baseline justify-between gap-6 font-grotesk text-[clamp(28px,5vw,88px)] font-extrabold leading-[0.98] tracking-[-0.035em]">
            <span>{next.title}</span>
            <span aria-hidden="true" className="font-extralight">
              →
            </span>
          </span>
        </CursorLink>
      )}
    </article>
  )
}

export default PostPage
