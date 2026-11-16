'use client'

import type { PostRow } from '@/server/admin-queries'
import type { FormAction } from '@/server/form-state'
import { AdminForm, FormGrid, getFieldValue } from './AdminForm'
import { GalleryField } from './fields/GalleryField'
import { ImageField } from './fields/ImageField'
import { TextAreaField, TextField } from './fields/TextFields'

type PostFormProps = {
  action: FormAction
  post?: PostRow
}

const BODY_HINT =
  "Laat een lege regel tussen alinea's. Een link maak je zo: [tekst](https://voorbeeld.nl). Begin een regel met ## voor een tussenkop, met - voor een opsomming of met 1. voor een genummerde lijst. Een tabel schrijf je als | Kolom | Kolom |."

export const PostForm = ({ action, post }: PostFormProps) => (
  <AdminForm action={action} cancelHref="/admin/blog" submitLabel={post ? 'Blog opslaan' : 'Blog plaatsen'}>
    {(state) => {
      const errors = state.fieldErrors ?? {}
      const value = (name: string, fallback = '') => getFieldValue(state, name, fallback)
      return (
        <>
          <TextField name="title" label="Titel" defaultValue={value('title', post?.title)} error={errors.title} isRequired />
          <FormGrid>
            <TextField
              name="slug"
              label="Slug"
              defaultValue={value('slug', post?.slug)}
              hint="Het laatste deel van de link, bijvoorbeeld cms-in-laravel."
              error={errors.slug}
              isRequired
            />
            <TextField
              name="year"
              label="Jaar"
              defaultValue={value('year', post?.year)}
              hint="Zet de nieuwste blog bovenaan in de lijst."
              error={errors.year}
              isRequired
            />
            <TextField
              name="readTime"
              label="Leestijd"
              defaultValue={value('readTime', post?.readTime)}
              hint="Bijvoorbeeld 3 min."
              error={errors.readTime}
              isRequired
            />
          </FormGrid>
          <TextField
            name="tags"
            label="Tags"
            defaultValue={value('tags', post?.tags.join(', '))}
            hint="Scheid met komma's, bijvoorbeeld Onderzocht met behulp van Claude, Security. Optioneel."
            error={errors.tags}
          />
          <TextAreaField
            name="excerpt"
            label="Korte omschrijving"
            rows={2}
            defaultValue={value('excerpt', post?.excerpt)}
            error={errors.excerpt}
            isRequired
          />
          <TextAreaField name="body" label="Tekst" rows={14} defaultValue={value('body', post?.body)} hint={BODY_HINT} error={errors.body} isRequired />
          <ImageField
            name="coverImage"
            label="Omslagfoto"
            defaultValue={{
              src: value('coverImage.src', post?.coverImage.src),
              alt: value('coverImage.alt', post?.coverImage.alt),
            }}
            hint="Bovenaan de blog. Optioneel."
            error={errors.coverImage}
          />
          <GalleryField name="gallery" label="Extra beelden in de blog" defaultValue={post?.gallery ?? []} error={errors.gallery} />
        </>
      )
    }}
  </AdminForm>
)
