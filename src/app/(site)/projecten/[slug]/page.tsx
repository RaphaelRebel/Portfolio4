import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProjectDetail } from '@/components/projects/ProjectDetail'
import { getProjectBySlug, getProjectNeighbours, getProjects } from '@/server/queries'

type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = async () => {
  const projects = await getProjects()
  return projects.map(({ slug }) => ({ slug }))
}

export const generateMetadata = async ({ params }: ProjectPageProps): Promise<Metadata> => {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.summary,
    openGraph: { images: [{ url: project.coverImage.src, alt: project.coverImage.alt }] },
  }
}

const ProjectPage = async ({ params }: ProjectPageProps) => {
  const { slug } = await params
  const [project, neighbours] = await Promise.all([getProjectBySlug(slug), getProjectNeighbours(slug)])
  if (!project || !neighbours) notFound()

  return (
    <ProjectDetail
      project={project}
      position={neighbours.position}
      total={neighbours.total}
      nextProject={neighbours.next}
      nextPosition={neighbours.nextPosition}
    />
  )
}

export default ProjectPage
