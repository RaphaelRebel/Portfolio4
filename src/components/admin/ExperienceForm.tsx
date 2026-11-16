'use client'

import type { ExperienceRow } from '@/server/admin-queries'
import type { FormAction } from '@/server/form-state'
import { AdminForm, FormGrid, getFieldValue } from './AdminForm'
import { ImageField } from './fields/ImageField'
import { TextField } from './fields/TextFields'

type ExperienceFormProps = {
  action: FormAction
  item?: ExperienceRow
}

export const ExperienceForm = ({ action, item }: ExperienceFormProps) => (
  <AdminForm action={action} cancelHref="/admin/ervaring" submitLabel={item ? 'Werkplek opslaan' : 'Werkplek toevoegen'}>
    {(state) => {
      const errors = state.fieldErrors ?? {}
      const value = (name: string, fallback = '') => getFieldValue(state, name, fallback)
      return (
        <>
          <FormGrid>
            <TextField name="role" label="Functie" defaultValue={value('role', item?.role)} error={errors.role} isRequired />
            <TextField
              name="organisation"
              label="Organisatie"
              defaultValue={value('organisation', item?.organisation)}
              error={errors.organisation}
              isRequired
            />
            <TextField
              name="period"
              label="Periode"
              defaultValue={value('period', item?.period)}
              hint="Bijvoorbeeld 2024 tot 2025 of 2026 tot nu."
              error={errors.period}
              isRequired
            />
          </FormGrid>
          <TextField
            name="summary"
            label="Eén korte zin"
            defaultValue={value('summary', item?.summary)}
            error={errors.summary}
            isRequired
          />
          <ImageField
            name="image"
            label="Beeld bij hover"
            defaultValue={{
              src: value('image.src', item?.image.src),
              alt: value('image.alt', item?.image.alt),
            }}
            hint="Verschijnt naast de muis als je over deze regel beweegt."
            error={errors.image}
          />
        </>
      )
    }}
  </AdminForm>
)
