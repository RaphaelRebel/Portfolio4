import type { Metadata, Viewport } from 'next'
import { Schibsted_Grotesk, Source_Serif_4 } from 'next/font/google'
import type { ReactNode } from 'react'
import { siteConfig } from '@/content/site'
import { cn } from '@/lib/cn'
import './globals.css'

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-source-serif',
  display: 'swap',
})

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ['latin'],
  variable: '--font-schibsted-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name}, softwaredeveloper`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    siteName: siteConfig.name,
    title: `${siteConfig.name}, softwaredeveloper`,
    description: siteConfig.description,
    images: [{ url: '/images/avatar.png', width: 400, height: 400, alt: siteConfig.name }],
  },
}

export const viewport: Viewport = {
  themeColor: '#f3f2f2',
}

type RootLayoutProps = Readonly<{
  children: ReactNode
}>

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="nl" className={cn(sourceSerif.variable, schibstedGrotesk.variable)}>
    <body>{children}</body>
  </html>
)

export default RootLayout
