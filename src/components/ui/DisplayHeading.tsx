import { cn } from '@/lib/cn'

type HeadingWeight = 'thin' | 'bold'
type HeadingIndent = 'none' | 'small' | 'medium' | 'large'
type HeadingSize = 'hero' | 'page' | 'section' | 'contact'

type HeadingPart = {
  text: string
  weight: HeadingWeight
}

export type HeadingLine = {
  parts: readonly HeadingPart[]
  indent?: HeadingIndent
  className?: string
}

type DisplayHeadingProps = {
  as?: 'h1' | 'h2'
  id?: string
  lines: readonly HeadingLine[]
  size?: HeadingSize
  srPrefix?: string
  isAnimated?: boolean
  className?: string
}

const lineDelayClasses = ['', '[animation-delay:120ms]', '[animation-delay:240ms]', '[animation-delay:360ms]']

export const thin = (text: string): HeadingPart => ({ text, weight: 'thin' })
export const bold = (text: string): HeadingPart => ({ text, weight: 'bold' })

export const DisplayHeading = ({
  as: Tag = 'h2',
  id,
  lines,
  size = 'section',
  srPrefix,
  isAnimated = false,
  className,
}: DisplayHeadingProps) => (
  <Tag
    id={id}
    className={cn(
      'm-0 font-serif font-normal tracking-[-0.025em]',
      {
        'text-[clamp(28px,min(8.6vw,11vh),172px)] leading-[0.94]': size === 'hero',
        'text-[clamp(40px,9.4vw,172px)] leading-[0.94]': size === 'page',
        'text-[clamp(40px,7vw,120px)] leading-[0.95]': size === 'section',
        'text-[clamp(44px,9vw,164px)] leading-[0.94]': size === 'contact',
      },
      className,
    )}
  >
    {srPrefix && <span className="sr-only">{srPrefix}</span>}
    {lines.map((line, lineIndex) => (
      <span
        key={line.parts.map((part) => part.text).join('')}
        className={cn('block', lineDelayClasses[lineIndex], line.className, {
          'pl-[5vw]': line.indent === 'small',
          'pl-[10vw]': line.indent === 'medium',
          'pl-[13vw]': line.indent === 'large',
          'animate-rise': isAnimated,
        })}
      >
        {line.parts.map((part) => (
          <span
            key={part.text}
            className={cn({
              'font-extralight uppercase tracking-[-0.01em]': part.weight === 'thin',
              'font-grotesk font-extrabold tracking-[-0.035em]': part.weight === 'bold',
            })}
          >
            {part.text}
          </span>
        ))}
      </span>
    ))}
  </Tag>
)
