'use client'

import Image from 'next/image'
import { useRef, useState, type ChangeEvent } from 'react'
import { getUploadStatusText, useBlobUpload, type UploadKind } from '@/hooks/useBlobUpload'
import { getPillClassName } from '@/lib/styles'
import { Field, getDescribedBy, toFieldId } from './TextFields'

type UploadFieldProps = {
  name: string
  label: string
  defaultUrl: string
  kind: UploadKind
  hint?: string
  error?: string[]
}

const acceptByKind: Record<UploadKind, string> = {
  image: 'image/png,image/jpeg,image/webp,image/avif',
  pdf: 'application/pdf',
}

export const UploadField = ({ name, label, defaultUrl, kind, hint, error }: UploadFieldProps) => {
  const [url, setUrl] = useState(defaultUrl)
  const { status, uploadFile } = useBlobUpload(kind)
  const inputRef = useRef<HTMLInputElement>(null)
  const id = toFieldId(name)

  const handlePickClick = () => inputRef.current?.click()

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget
    const file = input.files?.[0]
    if (!file) return
    const uploadedUrl = await uploadFile(file)
    input.value = ''
    if (!uploadedUrl) return
    setUrl(uploadedUrl)
  }

  return (
    <Field id={id} label={label} hint={hint} error={error}>
      <input type="hidden" name={name} value={url} />
      <input ref={inputRef} type="file" accept={acceptByKind[kind]} onChange={handleFileChange} className="hidden" />
      <div className="flex flex-wrap items-center gap-4">
        {kind === 'image' && url && (
          <Image src={url} alt="" width={96} height={96} className="size-24 rounded-sm bg-line object-cover" />
        )}
        {kind === 'pdf' && url && (
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-[17px]">
            Huidig bestand bekijken <span aria-hidden="true">↗</span>
          </a>
        )}
        <button
          id={id}
          type="button"
          onClick={handlePickClick}
          disabled={status === 'uploading'}
          aria-describedby={getDescribedBy(id, hint, error)}
          className={getPillClassName()}
        >
          {url ? 'Vervangen' : 'Bestand kiezen'}
        </button>
        <span role="status" className="text-[15px] text-ink-muted">
          {getUploadStatusText(status)}
        </span>
      </div>
    </Field>
  )
}
