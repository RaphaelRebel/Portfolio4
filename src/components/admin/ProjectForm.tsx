'use client'

import type { ImageAsset } from '@/content/types'
import type { ProjectRow } from '@/server/admin-queries'
import type { FormAction, FormState } from '@/server/form-state'
import { AdminForm, FormGrid, getFieldValue } from './AdminForm'
import { GalleryField } from './fields/GalleryField'
import { ImageField } from './fields/ImageField'
import { TextAreaField, TextField } from './fields/TextFields'

type ProjectFormProps = {
  action: FormAction
  project?: ProjectRow
}

const emptyImage: ImageAsset = { src: '', alt: '' }

const getImageValue = (state: FormState, name: string, fallback: ImageAsset) => ({
  src: getFieldValue(state, `${name}.src`, fallback.src),
  alt: getFieldValue(state, `${name}.alt`, fallback.alt),
})

export const ProjectForm = ({ action, project }: ProjectFormProps) => (
  <AdminForm action={action} cancelHref="/admin/projecten" submitLabel={project ? 'Project opslaan' : 'Project toevoegen'}>
    {(state) => {
      const errors = state.fieldErrors ?? {}
      const value = (name: string, fallback = '') => getFieldValue(state, name, fallback)
      return (
        <>
          <FormGrid>
            <TextField name="title" label="Titel" defaultValue={value('title', project?.title)} error={errors.title} isRequired />
            <TextField
              name="slug"
              label="Slug"
              defaultValue={value('slug', project?.slug)}
              hint="Het laatste deel van de link, bijvoorbeeld santani-organics."
              error={errors.slug}
              isRequired
            />
            <TextField name="type" label="Type project" defaultValue={value('type', project?.type)} error={errors.type} isRequired />
            <TextField name="period" label="Periode" defaultValue={value('period', project?.period)} error={errors.period} isRequired />
            <TextField name="role" label="Rol" defaultValue={value('role', project?.role)} error={errors.role} isRequired />
            <TextField
              name="tech"
              label="Technieken"
              defaultValue={value('tech', project?.tech.join(', '))}
              hint="Scheid met komma's, bijvoorbeeld Laravel, React."
              error={errors.tech}
              isRequired
            />
            <TextField name="liveUrl" label="Link naar live site" type="url" defaultValue={value('liveUrl', project?.liveUrl)} error={errors.liveUrl} />
            <TextField
              name="liveLabel"
              label="Tekst van de link"
              defaultValue={value('liveLabel', project?.liveLabel)}
              hint="Bijvoorbeeld santaniorganicsoda.com."
              error={errors.liveLabel}
            />
          </FormGrid>
          <TextField
            name="summary"
            label="Korte zin op de kaart"
            defaultValue={value('summary', project?.summary)}
            error={errors.summary}
            isRequired
          />
          <TextAreaField name="problem" label="Het probleem" defaultValue={value('problem', project?.problem)} error={errors.problem} isRequired />
          <TextAreaField name="solution" label="Mijn oplossing" defaultValue={value('solution', project?.solution)} error={errors.solution} isRequired />
          <FormGrid>
            <ImageField
              name="cardImage"
              label="Kaartbeeld (vierkant)"
              defaultValue={getImageValue(state, 'cardImage', project?.cardImage ?? emptyImage)}
              hint="Wordt vierkant bijgesneden in de galerij, de carrousel en op de kaarten."
              error={errors.cardImage}
            />
            <ImageField
              name="coverImage"
              label="Hoofdbeeld (breed)"
              defaultValue={getImageValue(state, 'coverImage', project?.coverImage ?? emptyImage)}
              hint="Bovenaan de projectpagina, in 16:9."
              error={errors.coverImage}
            />
          </FormGrid>
          <GalleryField name="gallery" label="Extra beelden op de projectpagina" defaultValue={project?.gallery ?? []} error={errors.gallery} />
        </>
      )
    }}
  </AdminForm>
)
