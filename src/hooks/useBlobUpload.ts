'use client'

import { upload } from '@vercel/blob/client'
import { useState } from 'react'

export type UploadKind = 'image' | 'pdf'
export type UploadStatus = 'idle' | 'uploading' | 'error'

const UPLOAD_ENDPOINT = '/api/admin/upload'

const folders: Record<UploadKind, string> = {
  image: 'images',
  pdf: 'cv',
}

const toSafeFileName = (fileName: string) => fileName.toLowerCase().replace(/[^a-z0-9.]+/g, '-')

export const useBlobUpload = (kind: UploadKind) => {
  const [status, setStatus] = useState<UploadStatus>('idle')

  const uploadFile = async (file: File) => {
    setStatus('uploading')
    try {
      const blob = await upload(`${folders[kind]}/${toSafeFileName(file.name)}`, file, {
        access: 'public',
        handleUploadUrl: UPLOAD_ENDPOINT,
      })
      setStatus('idle')
      return blob.url
    } catch {
      setStatus('error')
      return null
    }
  }

  return { status, uploadFile }
}

export const getUploadStatusText = (status: UploadStatus) => {
  if (status === 'uploading') return 'Bezig met uploaden…'
  if (status === 'error') return 'Upload mislukt. Probeer het opnieuw.'
  return ''
}
