import React from 'react'
import { useForm } from 'react-hook-form'
import { Grid, Container } from '@material-ui/core'

import { Button, Input } from '@ui-components'
import { t, i18nKeys } from 'locales/i18n'
import { FormFooter } from './FormFooter'
import { FormHeader } from './FormHeader'

interface ResetPasswordProps {
  username: string
  onError: (content: string) => void
  requestCode: (email: string) => Promise<void>
  resetPassword: (code: string, password: string) => Promise<void>
}

interface ResetPasswordForm {
  code: string
  password: string
}

export const ResetPassword: React.FC<ResetPasswordProps> = ({
  username,
  onError,
  requestCode,
  resetPassword,
}: ResetPasswordProps) => {
  const { control, handleSubmit } = useForm<ResetPasswordForm>({
    defaultValues: { code: '', password: '' },
  })

  const onSubmit = async ({ code, password }: ResetPasswordForm): Promise<void> => {
    try {
      await resetPassword(code, password)
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
        <FormHeader data-testid='reset-password-form-header'>{t(i18nKeys.auth.forgotPassword.headerReset)}</FormHeader>
        <Input
          dataTestId='reset-password-code-input'
          rules={{ required: true }}
          name='code'
          label={t(i18nKeys.auth.labels.code)}
          control={control}
        />
        <Input
          dataTestId='reset-password-new-password-input'
          rules={{ required: true }}
          name='password'
          label={t(i18nKeys.auth.labels.newPassword)}
          type='password'
          control={control}
        />
        <FormFooter>
          <Button data-testid='reset-password-btn' type='submit' fullWidth>
            {t(i18nKeys.auth.forgotPassword.actions.submit)}
          </Button>
          <Grid container>
            <Grid item xs>
              <span onClick={(): Promise<void> => requestCode(username)}>
                {t(i18nKeys.auth.forgotPassword.actions.resendCode)}
              </span>
            </Grid>
          </Grid>
        </FormFooter>
      </Container>
    </form>
  )
}
