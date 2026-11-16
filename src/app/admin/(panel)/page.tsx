import Image from 'next/image'
import Link from 'next/link'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { cn } from '@/lib/cn'
import { formatIndex, padNumber } from '@/lib/format'
import { labelClass } from '@/lib/styles'
import { getAdminExperience, getAdminPosts, getAdminProfile, getAdminProjects, getAdminSkillGroups } from '@/server/admin-queries'

type DashboardRow = {
  href: string
  label: string
  preview: string
  count: string
  thumbs: string[]
}

const MAX_THUMBS = 3

const unique = (items: string[]) => items.filter((item, index) => items.indexOf(item) === index)

const toThumbs = (sources: string[]) => sources.filter(Boolean).slice(0, MAX_THUMBS)

const DashboardPage = async () => {
  const [projects, experience, skillGroups, profile, posts] = await Promise.all([
    getAdminProjects(),
    getAdminExperience(),
    getAdminSkillGroups(),
    getAdminProfile(),
    getAdminPosts(),
  ])

  const organisations = unique(experience.map((item) => item.organisation.replace('Projectmanagementbureau ', '')))
  const skillCount = skillGroups.reduce((total, group) => total + group.items.length, 0)
  const paragraphs = profile?.aboutParagraphs ?? []

  const rows: DashboardRow[] = [
    {
      href: '/admin/projecten',
      label: 'Projecten',
      preview: projects.map((project) => project.title).join(', ') || 'Nog geen projecten',
      count: `${padNumber(projects.length)} projecten`,
      thumbs: toThumbs(projects.map((project) => project.cardImage.src)),
    },
    {
      href: '/admin/ervaring',
      label: 'Ervaring',
      preview: organisations.join(', ') || 'Nog geen werkplekken',
      count: `${padNumber(experience.length)} werkplekken`,
      thumbs: toThumbs(experience.map((item) => item.image.src)),
    },
    {
      href: '/admin/skills',
      label: 'Skills',
      preview: skillGroups.flatMap((group) => group.items).join(', ') || 'Nog geen skills',
      count: `${padNumber(skillCount)} in ${padNumber(skillGroups.length)} groepen`,
      thumbs: [],
    },
    {
      href: '/admin/over-mij',
      label: 'Over mij',
      preview: paragraphs[0] ?? 'Nog geen tekst',
      count: `${padNumber(paragraphs.length)} alinea's`,
      thumbs: toThumbs([profile?.portrait.src ?? '']),
    },
    {
      href: '/admin/contact',
      label: 'Contact en cv',
      preview: [profile?.email, profile?.phone].filter(Boolean).join(' · ') || 'Nog geen gegevens',
      count: profile?.cvUrl ? 'Cv staat online' : 'Geen cv',
      thumbs: [],
    },
    {
      href: '/admin/blog',
      label: 'Blog',
      preview: posts.map((post) => post.title).join(', ') || 'Nog geen posts',
      count: `${padNumber(posts.length)} posts`,
      thumbs: toThumbs(posts.map((post) => post.coverImage.src)),
    },
  ]

  return (
    <>
      <AdminPageHeader
        eyebrow="( Beheer )"
        title="Overzicht"
        description="Kies wat je wilt aanpassen. Wijzigingen staan direct na opslaan op de site."
      />
      <ol className="m-0 list-none border-b border-line p-0">
        {rows.map((row, index) => (
          <li key={row.href} className="border-t border-line">
            <Link
              href={row.href}
              className="flex flex-wrap items-center gap-x-[clamp(16px,2.5vw,40px)] gap-y-4 py-[clamp(22px,2.6vw,36px)] text-ink no-underline transition-[padding,color] duration-[350ms] ease-out-soft hover:pl-3.5 hover:text-link"
            >
              <span className={cn(labelClass, 'w-[52px] flex-none tabular-nums')}>{formatIndex(index + 1)}</span>
              <span className="flex min-w-0 flex-[1_1_320px] flex-col gap-2.5">
                <span
                  className={cn('text-[clamp(36px,5.2vw,76px)] leading-[0.95]', {
                    'font-serif font-extralight uppercase tracking-[-0.01em]': index % 2 === 0,
                    'font-grotesk font-extrabold tracking-[-0.035em]': index % 2 === 1,
                  })}
                >
                  {row.label}
                </span>
                <span className="line-clamp-2 max-w-[56ch] text-[17px] leading-[1.4] text-ink-muted">{row.preview}</span>
              </span>
              {row.thumbs.length > 0 && (
                <span aria-hidden="true" className="flex flex-none pl-5">
                  {row.thumbs.map((src) => (
                    <Image
                      key={src}
                      src={src}
                      alt=""
                      width={68}
                      height={68}
                      className="-ml-5 size-[68px] rounded-sm border-[3px] border-paper bg-line object-cover object-[50%_30%]"
                    />
                  ))}
                </span>
              )}
              <span className="ml-auto flex min-w-[150px] flex-none items-center justify-end gap-4">
                <span className={cn(labelClass, 'text-right font-bold tabular-nums')}>{row.count}</span>
                <span
                  aria-hidden="true"
                  className="inline-flex size-11 flex-none items-center justify-center rounded-full border border-current font-grotesk text-base"
                >
                  →
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </>
  )
}

export default DashboardPage
