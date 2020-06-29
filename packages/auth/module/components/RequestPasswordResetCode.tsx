import React from 'react'
import { useForm } from 'react-hook-form'
import { Grid } from '@material-ui/core'

import { DynamicForm } from '@ui-components'
import { t, i18nKeys } from 'locales/i18n'
import { FormHeader, FormFooter, ChangeAuthStateLink } from '.'
import { requestPasswordResetLayout, requestPasswordResetActions } from '../constants'

const authKeys = i18nKeys.auth

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
    <DynamicForm
      actions={requestPasswordResetActions({
        sendCode: t(i18nKeys.auth.forgotPassword.actions.sendCode),
      })}
      control={control}
      dataTestId='forgot-password-send-form'
      handleSubmit={handleSubmit}
      layout={requestPasswordResetLayout({
        email: t(authKeys.labels.email),
      })}
      name='request-password-reset'
      onSubmit={onSubmit}
      FormHeader={() => (
        <FormHeader data-testid='request-new-password-form-header'>
          {t(authKeys.forgotPassword.headerRequest)}
        </FormHeader>
      )}
      FormFooter={() => <RequestPasswordResetFormFooter />}
    />
  )
}

const RequestPasswordResetFormFooter = () => (
  <FormFooter>
    <Grid container>
      <Grid item>
        <ChangeAuthStateLink newState='signIn' label={t(authKeys.signIn.actions.backToSignIn)} />
      </Grid>
    </Grid>
  </FormFooter>
)
