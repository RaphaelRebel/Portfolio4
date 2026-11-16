import type { Metadata } from 'next'
import { SectionPageShell } from '@/components/layout/SectionPageShell'
import { ContactSection } from '@/components/sections/ContactSection'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Neem contact op met Raphael Rebel voor een zzp-opdracht.',
}

const ContactPage = () => (
  <SectionPageShell currentHref="/contact">
    <ContactSection variant="page" />
  </SectionPageShell>
)

export default ContactPage
