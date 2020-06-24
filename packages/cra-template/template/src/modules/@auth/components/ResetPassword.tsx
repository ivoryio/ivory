import React from 'react'
import { useForm } from 'react-hook-form'
import { Grid } from '@material-ui/core'

import { DynamicForm } from 'app/components'
import { t, i18nKeys } from 'locales/i18n'
import { FormHeader, FormFooter } from '.'
import { resetPasswordLayout, resetPasswordActions } from '../constants'

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

interface ResetPasswordFormFooterProps {
  requestCode: (email: string) => Promise<void>
  username: string
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
    <DynamicForm
      actions={resetPasswordActions({
        submit: t(i18nKeys.auth.forgotPassword.actions.submit),
      })}
      control={control}
      dataTestId='forgot-password-send-form'
      handleSubmit={handleSubmit}
      layout={resetPasswordLayout({
        code: t(i18nKeys.auth.labels.code),
        newPassword: t(i18nKeys.auth.labels.newPassword),
      })}
      name='require-new-password'
      onSubmit={onSubmit}
      FormHeader={() => (
        <FormHeader data-testid='reset-password-form-header'>
          {t(i18nKeys.auth.forgotPassword.headerReset)}
        </FormHeader>
      )}
      FormFooter={() => <ResetPasswordFormFooter requestCode={requestCode} username={username} />}
    />
  )
}

const ResetPasswordFormFooter = ({ requestCode, username }: ResetPasswordFormFooterProps) => (
  <FormFooter>
    <Grid container>
      <Grid item xs>
        <span onClick={(): Promise<void> => requestCode(username)}>
          {t(i18nKeys.auth.forgotPassword.actions.resendCode)}
        </span>
      </Grid>
    </Grid>
  </FormFooter>
)
