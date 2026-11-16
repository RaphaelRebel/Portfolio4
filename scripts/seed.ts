import { config } from 'dotenv'

config({ path: '.env.local' })

const main = async () => {
  const { db } = await import('../src/db/client')
  const { experiences, posts, profile, projects, skillGroups, PROFILE_ID } = await import('../src/db/schema')
  const { seedExperience, seedPosts, seedProfile, seedProjects, seedSkillGroups } = await import('../src/db/seed-data')
  const isForced = process.argv.includes('--force')

  const existingProjects = await db.select({ id: projects.id }).from(projects).limit(1)
  if (existingProjects.length > 0 && !isForced) {
    console.log('Database already has content. Run "npm run db:seed -- --force" to replace it.')
    return
  }

  await db.delete(projects)
  await db.delete(experiences)
  await db.delete(skillGroups)
  await db.delete(posts)
  await db.delete(profile)

  await db.insert(projects).values(seedProjects.map((project, position) => ({ ...project, position })))
  await db.insert(experiences).values(seedExperience.map((item, position) => ({ ...item, position })))
  await db.insert(skillGroups).values(seedSkillGroups.map((group, position) => ({ ...group, position })))
  await db.insert(posts).values(seedPosts.map((post, position) => ({ ...post, position })))
  await db.insert(profile).values({ id: PROFILE_ID, ...seedProfile })

  console.log('Seeded projects, experience, skills, blog posts and profile.')
}

main().catch((error: unknown) => {
  console.error(error)
  process.exit(1)
})
