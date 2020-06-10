import React from 'react'
import { useForm } from 'react-hook-form'
import { Grid, Container } from '@material-ui/core'

import { Button, Input } from 'app/components'
import { t, i18nKeys } from 'locales/i18n'
import { FormHeader, FormFooter, ChangeAuthStateLink } from '.'

interface RequestPasswordResetCodeProps {
  onError: (content: string) => void
  requestCode: (email: string) => Promise<void>
}

interface ResetPasswordForm {
  email: string
}

export const RequestPasswordResetCode: React.FC<RequestPasswordResetCodeProps> = ({
  onError,
  requestCode,
}: RequestPasswordResetCodeProps) => {
  const { control, handleSubmit } = useForm<ResetPasswordForm>({
    defaultValues: { email: '' },
  })

  const onSubmit = async ({ email }: ResetPasswordForm): Promise<void> => {
    try {
      await requestCode(email)
    } catch (error) {
      const content = t(`auth.forgotPassword.errors.${error.code}`, {
        defaultValue: error.message,
      })
      onError(content)
    }
  }

  return (
    <form data-testid='forgot-password-send-form' onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth='xs'>
        <FormHeader data-testid='request-new-password-form-header'>{t(i18nKeys.auth.forgotPassword.headerRequest)}</FormHeader>
        <Input
          dataTestId='request-new-password-email-input'
          rules={{ required: true }}
          name='email'
          label={t(i18nKeys.auth.labels.email)}
          type='email'
          control={control}
        />
        <FormFooter>
          <Button data-testid='request-password-reset-code-btn' type='submit' fullWidth>
            {t(i18nKeys.auth.forgotPassword.actions.sendCode)}
          </Button>
          <Grid container>
            <Grid item>
              <ChangeAuthStateLink
                newState='signIn'
                label={t(i18nKeys.auth.signIn.actions.backToSignIn)}
              />
            </Grid>
          </Grid>
        </FormFooter>
      </Container>
    </form>
  )
}
