import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { NextResponse } from 'next/server'
import { isAuthenticated } from '@/server/auth'

const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/avif']
const PDF_TYPES = ['application/pdf']
const MAX_SIZE_BYTES = 10 * 1024 * 1024

export const POST = async (request: Request) => {
  const body = (await request.json()) as HandleUploadBody

  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!(await isAuthenticated())) throw new Error('Je bent niet ingelogd.')
        const isCv = pathname.startsWith('cv/')
        return {
          allowedContentTypes: isCv ? PDF_TYPES : IMAGE_TYPES,
          maximumSizeInBytes: MAX_SIZE_BYTES,
          addRandomSuffix: true,
        }
      },
      onUploadCompleted: async () => {},
    })
    return NextResponse.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload mislukt.'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
