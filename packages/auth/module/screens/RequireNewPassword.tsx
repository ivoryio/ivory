import React from 'react'
import { useForm } from 'react-hook-form'
import { Container } from '@material-ui/core'

import { Button, Input } from '@ui-components'
import { useToast } from 'hooks/useToast'
import { t, i18nKeys } from 'locales/i18n'
import { FormHeader, FormFooter } from '../components'
import { useRequireNewPassword } from '../hooks/userRequireNewPassword'

interface NewPasswordForm {
  password: string
}

export const RequireNewPassword: React.FC = () => {
  const completeNewPassword = useRequireNewPassword()
  const { showToast: showNotification, Toast } = useToast()
  const { control, handleSubmit } = useForm<NewPasswordForm>({
    defaultValues: { password: '' },
  })

  const onSubmit = async ({ password }: NewPasswordForm): Promise<void> => {
    try {
      await completeNewPassword(password)
    } catch (error) {
      const content = t(`auth.requireNewPassword.errors.${error.code}`, {
        defaultValue: error.message,
      })
      showNotification(content, 'error')
    }
  }

  return (
    <form data-testid='forgot-password-send-form' onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth='xs'>
        <FormHeader data-testid='require-new-password-form-header'>{t(i18nKeys.auth.requireNewPassword.header)}</FormHeader>
        <Input
          dataTestId='require-password-input'
          rules={{ required: true }}
          name='password'
          label={t(i18nKeys.auth.labels.newPassword)}
          type='password'
          control={control}
        />
        <FormFooter>
          <Button data-testid='require-new-password-btn' type='submit' fullWidth>
            {t(i18nKeys.auth.requireNewPassword.actions.change)}
          </Button>
        </FormFooter>
      </Container>
      <Toast />
    </form>
  )
}
