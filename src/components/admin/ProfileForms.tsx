'use client'

import type { ProfileRow } from '@/server/admin-queries'
import { saveAbout, saveContact } from '@/server/actions/profile'
import { AdminForm, FormGrid, getFieldValue } from './AdminForm'
import { ImageField } from './fields/ImageField'
import { TextAreaField, TextField } from './fields/TextFields'
import { UploadField } from './fields/UploadField'

type ProfileFormProps = {
  profile: ProfileRow | null
}

export const AboutForm = ({ profile }: ProfileFormProps) => (
  <AdminForm action={saveAbout} cancelHref="/admin" submitLabel="Over mij opslaan">
    {(state) => {
      const errors = state.fieldErrors ?? {}
      return (
        <>
          <TextAreaField
            name="aboutParagraphs"
            label="Tekst"
            rows={10}
            defaultValue={getFieldValue(state, 'aboutParagraphs', profile?.aboutParagraphs.join('\n\n'))}
            hint="Laat een lege regel tussen alinea's."
            error={errors.aboutParagraphs}
            isRequired
          />
          <ImageField
            name="portrait"
            label="Portretfoto"
            defaultValue={{
              src: getFieldValue(state, 'portrait.src', profile?.portrait.src),
              alt: getFieldValue(state, 'portrait.alt', profile?.portrait.alt),
            }}
            hint="Wordt vierkant bijgesneden."
            error={errors.portrait}
          />
        </>
      )
    }}
  </AdminForm>
)

export const ContactForm = ({ profile }: ProfileFormProps) => (
  <AdminForm action={saveContact} cancelHref="/admin" submitLabel="Contactgegevens opslaan">
    {(state) => {
      const errors = state.fieldErrors ?? {}
      return (
        <>
          <FormGrid>
            <TextField
              name="email"
              label="E-mailadres"
              type="email"
              autoComplete="email"
              defaultValue={getFieldValue(state, 'email', profile?.email)}
              error={errors.email}
              isRequired
            />
            <TextField
              name="phone"
              label="Telefoonnummer"
              type="tel"
              autoComplete="tel"
              defaultValue={getFieldValue(state, 'phone', profile?.phone)}
              hint="Zoals het op de site moet staan, bijvoorbeeld 06 83 54 17 51."
              error={errors.phone}
              isRequired
            />
          </FormGrid>
          <TextField
            name="linkedInUrl"
            label="LinkedIn-profiel"
            type="url"
            defaultValue={getFieldValue(state, 'linkedInUrl', profile?.linkedInUrl)}
            error={errors.linkedInUrl}
          />
          <UploadField
            name="cvUrl"
            label="Cv (PDF)"
            kind="pdf"
            defaultUrl={getFieldValue(state, 'cvUrl', profile?.cvUrl)}
            hint="Bezoekers downloaden dit bestand via de knop op de site."
            error={errors.cvUrl}
          />
        </>
      )
    }}
  </AdminForm>
)
