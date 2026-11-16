import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CursorLink } from '@/components/cursor/CursorLink'
import { PageTopBar } from '@/components/layout/PageTopBar'
import {
  Fact,
  Story,
  detailHeadingClass,
  factsClass,
  nextLinkClass,
  nextTitleClass,
  storiesClass,
} from '@/components/projects/ProjectDetail'
import { DetailImage } from '@/components/ui/DetailImages'
import { DisplayHeading, bold, thin } from '@/components/ui/DisplayHeading'
import { getOrganisationPage, organisationPages } from '@/content/organisations'
import { cn } from '@/lib/cn'
import { formatIndex, padNumber } from '@/lib/format'
import { getOrganisationHref } from '@/lib/routes'
import { labelClass } from '@/lib/styles'

type OrganisationPageProps = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export const generateStaticParams = () => organisationPages.map(({ slug }) => ({ slug }))

export const generateMetadata = async ({ params }: OrganisationPageProps): Promise<Metadata> => {
  const page = getOrganisationPage((await params).slug)
  if (!page) return {}
  return { title: page.name, description: `${page.role} bij ${page.name}, ${page.period}.` }
}

const OrganisationDetailPage = async ({ params }: OrganisationPageProps) => {
  const { slug } = await params
  const index = organisationPages.findIndex((page) => page.slug === slug)
  if (index === -1) notFound()

  const page = organisationPages[index]
  const total = organisationPages.length
  const nextIndex = (index + 1) % total
  const nextPage = organisationPages[nextIndex]

  return (
    <article aria-labelledby="h-org" className="px-gutter pt-[calc(var(--spacing-header)+clamp(32px,5vw,80px))]">
      <PageTopBar
        backHref="/ervaring"
        backLabel="Alle ervaring"
        aside={`( Organisatie ${padNumber(index + 1)}/${padNumber(total)} )`}
      />
      <div lang="nl">
        <DisplayHeading
          as="h1"
          id="h-org"
          size="contact"
          isAnimated
          className={detailHeadingClass}
          lines={[
            { parts: [thin(page.name)] },
            { parts: [bold(page.role)], indent: 'medium', className: 'text-[0.62em] leading-none' },
          ]}
        />
      </div>
      <dl className={factsClass}>
        <Fact term="Rol">{page.role}</Fact>
        <Fact term="Periode">{page.period}</Fact>
        <Fact term="Technieken">{page.tech}</Fact>
        <Fact term="Website">
          <a href={page.websiteUrl} target="_blank" rel="noopener noreferrer">
            {page.websiteLabel} <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opent in nieuw tabblad)</span>
          </a>
        </Fact>
      </dl>
      <DetailImage image={page.image} />
      <div className={storiesClass}>
        <Story id="h-org-rol" title={page.kind} className="max-w-[40ch]">
          {page.intro}
        </Story>
        <Story id="h-org-loc" title="( Locatie )">
          {page.location}
        </Story>
      </div>
      <CursorLink href={getOrganisationHref(nextPage.slug)} cursorLabel="Volgende organisatie" className={nextLinkClass}>
        <span className={cn(labelClass, 'block font-bold')}>Volgende organisatie {formatIndex(nextIndex + 1)}</span>
        <span className={nextTitleClass}>
          <span>{nextPage.name}</span>
          <span aria-hidden="true" className="font-extralight">
            →
          </span>
        </span>
      </CursorLink>
    </article>
  )
}

export default OrganisationDetailPage
