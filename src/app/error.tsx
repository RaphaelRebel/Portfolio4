'use client'

import { DisplayHeading, bold, thin } from '@/components/ui/DisplayHeading'
import { cn } from '@/lib/cn'
import { getPillClassName, labelClass } from '@/lib/styles'

type ErrorPageProps = {
  reset: () => void
}

const ErrorPage = ({ reset }: ErrorPageProps) => {
  const handleReload = () => {
    reset()
    window.location.reload()
  }

  return (
    <div
      role="alert"
      className="fixed inset-0 z-300 flex flex-col justify-center gap-[clamp(24px,3vw,40px)] overflow-auto bg-paper p-[clamp(24px,6vw,96px)] text-ink"
    >
      <span className={cn(labelClass, 'font-bold')}>( Foutje )</span>
      <DisplayHeading
        as="h1"
        size="contact"
        lines={[{ parts: [thin('Er ontsnapte')] }, { parts: [bold('een bug')], indent: 'medium' }]}
      />
      <p className="m-0 max-w-[40ch] text-[clamp(18px,1.6vw,24px)] leading-[1.45]">
        Zelfs nette code heeft slechte dagen. Ververs de pagina, dan doen we alsof er niets is gebeurd.
      </p>
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={handleReload} className={getPillClassName({ variant: 'solid', size: 'lg' })}>
          Pagina verversen <span aria-hidden="true">↻</span>
        </button>
      </div>
    </div>
  )
}

export default ErrorPage
