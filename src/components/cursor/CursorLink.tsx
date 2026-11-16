'use client'

import Link from 'next/link'
import type { ComponentProps } from 'react'
import { useCursorLabel } from './CursorProvider'

type CursorLinkProps = ComponentProps<typeof Link> & {
  cursorLabel: string
}

export const CursorLink = ({ cursorLabel, ...linkProps }: CursorLinkProps) => {
  const cursorHandlers = useCursorLabel(cursorLabel)

  return <Link {...linkProps} {...cursorHandlers} />
}
