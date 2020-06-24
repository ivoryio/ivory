import React from 'react'
import { useForm } from 'react-hook-form'
import { DynamicForm } from 'app/components'
import { useToast } from 'hooks/useToast'
import { t, i18nKeys } from 'locales/i18n'
import { FormHeader } from '../components'
import { requireNewPasswordLayout, requireNewPasswordActions } from '../constants'
import { useRequireNewPassword } from '../hooks/userRequireNewPassword'

const authKeys = i18nKeys.auth
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
    <>
      <DynamicForm
        actions={requireNewPasswordActions({ change: t(i18nKeys.auth.requireNewPassword.actions.change) })}
        control={control}
        dataTestId='forgot-password-send-form'
        handleSubmit={handleSubmit}
        layout={requireNewPasswordLayout({
          newPassword: t(authKeys.labels.newPassword),
        })}
        name='require-new-password'
        onSubmit={onSubmit}
        FormHeader={() => (
          <FormHeader data-testid='require-new-password-form-header'>
            {t(authKeys.requireNewPassword.header)}
          </FormHeader>
        )}
      />
      <Toast />
    </>
  )
}
