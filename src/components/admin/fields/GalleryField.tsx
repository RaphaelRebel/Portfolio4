'use client'

import Image from 'next/image'
import { useRef, useState, type ChangeEvent } from 'react'
import type { ImageAsset } from '@/content/types'
import { getUploadStatusText, useBlobUpload } from '@/hooks/useBlobUpload'
import { cn } from '@/lib/cn'
import { getPillClassName, labelClass } from '@/lib/styles'
import { inputClass, toFieldId } from './TextFields'

type GalleryFieldProps = {
  name: string
  label: string
  defaultValue: readonly ImageAsset[]
  error?: string[]
}

const smallButtonClass =
  'min-h-11 cursor-pointer rounded-full border border-ink/25 bg-transparent px-4 font-grotesk text-xs font-bold uppercase tracking-[0.1em] text-ink hover:border-ink disabled:cursor-default disabled:opacity-45'

export const GalleryField = ({ name, label, defaultValue, error }: GalleryFieldProps) => {
  const [images, setImages] = useState<ImageAsset[]>([...defaultValue])
  const { status, uploadFile } = useBlobUpload('image')
  const inputRef = useRef<HTMLInputElement>(null)
  const errorId = `${toFieldId(name)}-error`

  const handleAddClick = () => inputRef.current?.click()

  const handleFilesChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget
    const files = Array.from(input.files ?? [])
    input.value = ''
    for (const file of files) {
      const url = await uploadFile(file)
      if (url) setImages((current) => [...current, { src: url, alt: '' }])
    }
  }

  const handleAltChange = (index: number, alt: string) =>
    setImages((current) => current.map((image, imageIndex) => (imageIndex === index ? { ...image, alt } : image)))

  const handleRemoveClick = (index: number) =>
    setImages((current) => current.filter((_image, imageIndex) => imageIndex !== index))

  const handleMove = (index: number, offset: -1 | 1) =>
    setImages((current) => {
      const target = index + offset
      if (target < 0 || target >= current.length) return current
      const next = [...current]
      const moved = next[index]
      next[index] = next[target]
      next[target] = moved
      return next
    })

  return (
    <fieldset
      aria-describedby={error?.length ? errorId : undefined}
      className="m-0 flex flex-col gap-4 rounded-sm border border-line p-5"
    >
      <legend className={cn(labelClass, 'px-1 font-bold')}>{label}</legend>
      <input type="hidden" name={name} value={JSON.stringify(images)} />
      <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp,image/avif" multiple onChange={handleFilesChange} className="hidden" />
      {images.length === 0 && <p className="m-0 text-[15px] text-ink-muted">Nog geen extra beelden.</p>}
      <ol className="m-0 flex list-none flex-col gap-4 p-0">
        {images.map((image, index) => {
          const altId = `${toFieldId(name)}-alt-${index}`
          return (
            <li key={`${index}-${image.src}`} className="flex flex-wrap items-end gap-4 border-t border-line pt-4 first:border-t-0 first:pt-0">
              <Image src={image.src} alt="" width={96} height={96} className="size-24 rounded-sm bg-line object-cover" />
              <div className="flex min-w-[220px] flex-1 flex-col gap-2">
                <label htmlFor={altId} className={cn(labelClass, 'font-bold')}>
                  Alt-tekst beeld {index + 1}
                </label>
                <input
                  id={altId}
                  value={image.alt}
                  onChange={(event) => handleAltChange(index, event.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => handleMove(index, -1)} disabled={index === 0} aria-label={`Beeld ${index + 1} omhoog`} className={smallButtonClass}>
                  ↑
                </button>
                <button type="button" onClick={() => handleMove(index, 1)} disabled={index === images.length - 1} aria-label={`Beeld ${index + 1} omlaag`} className={smallButtonClass}>
                  ↓
                </button>
                <button type="button" onClick={() => handleRemoveClick(index)} className={smallButtonClass}>
                  Verwijder
                </button>
              </div>
            </li>
          )
        })}
      </ol>
      <div className="flex flex-wrap items-center gap-4">
        <button type="button" onClick={handleAddClick} disabled={status === 'uploading'} className={getPillClassName()}>
          Beelden toevoegen
        </button>
        <span role="status" className="text-[15px] text-ink-muted">
          {getUploadStatusText(status)}
        </span>
      </div>
      {error?.length ? (
        <p id={errorId} className="m-0 text-[15px] font-semibold text-accent-2">
          {error[0]}
        </p>
      ) : null}
    </fieldset>
  )
}
