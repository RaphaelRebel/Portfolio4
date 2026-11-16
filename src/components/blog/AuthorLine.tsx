import Image from 'next/image'
import { siteConfig } from '@/content/site'

export const AuthorLine = () => (
  <div className="mt-7 flex items-center gap-3.5">
    <Image
      src="/images/avatar.webp"
      alt={`Portret van ${siteConfig.name}`}
      width={52}
      height={52}
      className="size-[52px] flex-none rounded-full bg-line object-cover"
    />
    <span className="flex flex-col gap-[3px]">
      <span className="font-serif text-lg font-bold leading-[1.1]">{siteConfig.name}</span>
      <span className="font-grotesk text-[11px] font-medium uppercase tracking-[0.1em] text-ink-muted">
        Webdeveloper · Duaal student
      </span>
    </span>
  </div>
)
