import Image from 'next/image'
import type { ImageAsset } from '@/content/types'
import { cn } from '@/lib/cn'

type DetailImageProps = {
  image: ImageAsset
  className?: string
}

/** A large image shown at its own aspect ratio, never taller than the screen. */
export const DetailImage = ({ image, className }: DetailImageProps) => {
  if (!image.src) return null

  return (
    <figure className={cn('m-0 mt-[clamp(48px,6vw,88px)]', className)}>
      <Image
        src={image.src}
        alt={image.alt}
        width={1600}
        height={900}
        priority
        sizes="100vw"
        className="block h-auto max-h-[78vh] w-auto max-w-full rounded-[clamp(20px,3vw,40px)] bg-line"
      />
    </figure>
  )
}

type DetailGalleryProps = {
  images: readonly ImageAsset[]
  className?: string
}

export const DetailGallery = ({ images, className }: DetailGalleryProps) => {
  if (images.length === 0) return null

  return (
    <ul
      className={cn(
        'm-0 mt-[clamp(72px,9vw,140px)] grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] items-start gap-[clamp(16px,2vw,32px)] p-0',
        className,
      )}
    >
      {images.map((image) => (
        <li key={image.src}>
          <Image
            src={image.src}
            alt={image.alt}
            width={800}
            height={600}
            sizes="(min-width: 768px) 33vw, 100vw"
            className="block h-auto w-full rounded-sm bg-line"
          />
        </li>
      ))}
    </ul>
  )
}
