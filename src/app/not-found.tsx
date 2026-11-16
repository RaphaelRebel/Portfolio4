import Link from 'next/link'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { DisplayHeading, bold, thin } from '@/components/ui/DisplayHeading'
import { cn } from '@/lib/cn'
import { getPillClassName, labelClass } from '@/lib/styles'

const NotFoundPage = () => (
  <>
    <SiteHeader />
    <main id="inhoud" tabIndex={-1} className="outline-none">
      <section
        aria-labelledby="h-404"
        className="flex min-h-[80vh] animate-section-in flex-col justify-center gap-[clamp(24px,3vw,40px)] px-gutter pt-[calc(var(--spacing-header)+clamp(40px,7vw,112px))]"
      >
        <span className={cn(labelClass, 'font-bold')}>( 404 )</span>
        <DisplayHeading
          as="h1"
          id="h-404"
          size="page"
          lines={[{ parts: [thin('Hier is')] }, { parts: [bold('niks (nog)')], indent: 'large' }]}
        />
        <p className="m-0 max-w-[40ch] text-[clamp(18px,1.6vw,24px)] leading-[1.45]">
          Misschien heb ik deze pagina nog niet gebouwd. Of je typte een gok in de adresbalk. Allebei prima.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/" className={getPillClassName({ variant: 'solid', size: 'lg' })}>
            <span aria-hidden="true">←</span> Terug naar home
          </Link>
        </div>
      </section>
    </main>
    <SiteFooter />
  </>
)

export default NotFoundPage
