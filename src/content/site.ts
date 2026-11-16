export const siteConfig = {
  name: 'Raphael Rebel',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  description:
    'Softwaredeveloper en duaal student Software Development aan de Hogeschool Utrecht. Beschikbaar voor zzp-opdrachten.',
  cvFileName: 'raphael-rebel-cv.pdf',
} as const
