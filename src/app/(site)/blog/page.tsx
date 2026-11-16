import type { Metadata } from 'next'
import { AuthorLine } from '@/components/blog/AuthorLine'
import { PostList } from '@/components/blog/PostList'
import { PageTopBar } from '@/components/layout/PageTopBar'
import { DisplayHeading, bold, thin } from '@/components/ui/DisplayHeading'
import { getPosts } from '@/server/queries'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Korte notities van Raphael Rebel over wat hij bouwt, leert en uitprobeert.',
}

const BlogPage = async () => {
  const posts = await getPosts()

  return (
    <section
      aria-labelledby="h-blog"
      className="animate-section-in px-gutter pt-[calc(var(--spacing-header)+clamp(40px,7vw,112px))]"
    >
      <PageTopBar backHref="/" backLabel="Home" aside="( Blog )" />
      <DisplayHeading
        as="h1"
        id="h-blog"
        size="page"
        isAnimated
        className="mt-[clamp(20px,3vw,40px)]"
        lines={[{ parts: [thin('Altijd')] }, { parts: [bold('aan het leren')], indent: 'large' }]}
      />
      <p className="m-0 mt-[clamp(32px,4vw,56px)] max-w-[46ch] text-[clamp(18px,1.5vw,22px)] leading-[1.45]">
        Korte notities over wat ik bouw, leer en uitprobeer.
      </p>
      <AuthorLine />
      <PostList posts={posts} />
    </section>
  )
}

export default BlogPage
