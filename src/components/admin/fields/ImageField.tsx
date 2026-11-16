'use client'

import type { ImageAsset } from '@/content/types'
import { cn } from '@/lib/cn'
import { labelClass } from '@/lib/styles'
import { TextField } from './TextFields'
import { UploadField } from './UploadField'

type ImageFieldProps = {
  name: string
  label: string
  defaultValue: ImageAsset
  hint?: string
  error?: string[]
}

export const ImageField = ({ name, label, defaultValue, hint, error }: ImageFieldProps) => (
  <fieldset className="m-0 flex flex-col gap-4 rounded-sm border border-line p-5">
    <legend className={cn(labelClass, 'px-1 font-bold')}>{label}</legend>
    <UploadField name={`${name}.src`} label="Afbeelding" defaultUrl={defaultValue.src} kind="image" hint={hint} />
    <TextField
      name={`${name}.alt`}
      label="Alt-tekst"
      defaultValue={defaultValue.alt}
      hint="Beschrijf kort wat er op de afbeelding staat, voor schermlezers."
      error={error}
    />
  </fieldset>
)
