import * as React from 'react'
import { Grid } from '@material-ui/core'
import { useForm } from 'react-hook-form'

import { t, i18nKeys } from 'locales/i18n'
import { useToast } from 'hooks/useToast'

import { DynamicForm } from 'app/components'
import { useConfirmSignIn } from '../hooks'
import { confirmSignInLayout, confirmSignInActions } from '../constants'
import { FormHeader, FormFooter, ChangeAuthStateLink } from '../components'

const authKeys = i18nKeys.auth

interface ConfirmSignInForm {
  code: string
}

export const ConfirmSignIn: React.FC = () => {
  const { control, handleSubmit } = useForm<ConfirmSignInForm>({
    defaultValues: {
      code: '',
    },
  })
  const { showToast: showNotification, Toast } = useToast()
  const { confirm } = useConfirmSignIn()

  const onSubmit = async ({ code }: ConfirmSignInForm): Promise<void> => {
    try {
      await confirm(code)
    } catch (error) {
      const content = t(`auth.confirmSignIn.errors.${error.code}`, {
        defaultValue: error.message,
      })
      showNotification(content, 'error')
    }
  }

  return (
    <>
      <DynamicForm
        actions={confirmSignInActions({ confirm: t(authKeys.confirmSignIn.actions.confirm) })}
        control={control}
        dataTestId='confirmSignInForm'
        handleSubmit={handleSubmit}
        layout={confirmSignInLayout({
          confirmationCode: t(authKeys.labels.confirmationCode),
        })}
        name='confirm-sign-in'
        onSubmit={onSubmit}
        FormHeader={() => (
          <FormHeader data-testid='confirm-sign-in-form-header'>
            {t(authKeys.confirmSignIn.header)}
          </FormHeader>
        )}
        FormFooter={() => <ConfirmSignInFormFooter />}
      />
      <Toast />
    </>
  )
}

const ConfirmSignInFormFooter = () => (
  <FormFooter>
    <Grid container>
      <Grid item>
        <ChangeAuthStateLink
          label={t(authKeys.confirmSignIn.actions.backToSignIn)}
          newState='signIn'
        />
      </Grid>
    </Grid>
  </FormFooter>
)
