import { AboutSection } from '@/components/sections/AboutSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProjectsPreviewSection } from '@/components/sections/ProjectsPreviewSection'
import { SkillsSection } from '@/components/sections/SkillsSection'

const HomePage = () => (
  <>
    <HeroSection />
    <ProjectsPreviewSection />
    <ExperienceSection />
    <SkillsSection />
    <AboutSection />
    <ContactSection />
  </>
)

export default HomePage
