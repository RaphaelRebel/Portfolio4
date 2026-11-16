'use client'

import type { SkillGroupRow } from '@/server/admin-queries'
import type { FormAction } from '@/server/form-state'
import { AdminForm, getFieldValue } from './AdminForm'
import { TextAreaField, TextField } from './fields/TextFields'

type SkillGroupFormProps = {
  action: FormAction
  group?: SkillGroupRow
}

export const SkillGroupForm = ({ action, group }: SkillGroupFormProps) => (
  <AdminForm action={action} cancelHref="/admin/skills" submitLabel={group ? 'Groep opslaan' : 'Groep toevoegen'}>
    {(state) => {
      const errors = state.fieldErrors ?? {}
      return (
        <>
          <TextField
            name="label"
            label="Naam van de groep"
            defaultValue={getFieldValue(state, 'label', group?.label)}
            hint="Bijvoorbeeld Back-end of Werkwijze."
            error={errors.label}
            isRequired
          />
          <TextAreaField
            name="description"
            label="Korte omschrijving"
            rows={2}
            defaultValue={getFieldValue(state, 'description', group?.description)}
            hint="Een zin onder de naam van de groep. Optioneel."
            error={errors.description}
          />
          <TextField
            name="items"
            label="Skills"
            defaultValue={getFieldValue(state, 'items', group?.items.join(', '))}
            hint="Scheid met komma's. Alle skills verschijnen ook in de doorlopende band."
            error={errors.items}
            isRequired
          />
        </>
      )
    }}
  </AdminForm>
)
