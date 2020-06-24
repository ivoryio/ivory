import * as React from 'react'
import { Grid } from '@material-ui/core'
import { useForm } from 'react-hook-form'

import { t, i18nKeys } from 'locales/i18n'
import { useToast } from 'hooks/useToast'

import { DynamicForm } from 'app/components'
import { useConfirmSignUp } from '../hooks'
import { confirmSignUpLayout, confirmSignUpActions } from '../constants'

import { FormHeader, FormFooter, ChangeAuthStateLink } from '../components'

const authKeys = i18nKeys.auth

interface ConfirmSignUpForm {
  code: string
}

interface ConfirmSignUpFormFooterProps {
  resend: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
}

export const ConfirmSignUp: React.FC = () => {
  const { control, handleSubmit } = useForm<ConfirmSignUpForm>({
    defaultValues: {
      code: '',
    },
  })
  const { showToast: showNotification, Toast } = useToast()
  const { confirm, resend } = useConfirmSignUp()

  const onSubmit = async ({ code }: ConfirmSignUpForm): Promise<void> => {
    try {
      await confirm(code)
    } catch (error) {
      const content = t(`auth.confirmSignUp.errors.${error.code}`, {
        defaultValue: error.message,
      })
      showNotification(content, 'error')
    }
  }

  return (
    <>
      <DynamicForm
        actions={confirmSignUpActions({ confirm: t(authKeys.confirmSignUp.actions.confirm) })}
        control={control}
        dataTestId='confirmSignUpForm'
        handleSubmit={handleSubmit}
        layout={confirmSignUpLayout({
          confirmationCode: t(authKeys.labels.confirmationCode),
        })}
        name='confirm-sign-in'
        onSubmit={onSubmit}
        FormHeader={() => (
          <FormHeader data-testid='confirm-sign-up-form-header'>
            {t(authKeys.confirmSignUp.header)}
          </FormHeader>
        )}
        FormFooter={() => <ConfirmSignUpFormFooter resend={resend} />}
      />
      <Toast />
    </>
  )
}

const ConfirmSignUpFormFooter = ({ resend }: ConfirmSignUpFormFooterProps) => (
  <FormFooter>
    <Grid container>
      <Grid item xs>
        <span onClick={resend}>{t(authKeys.confirmSignUp.actions.resend)}</span>
      </Grid>
      <Grid item>
        <ChangeAuthStateLink
          label={t(authKeys.confirmSignUp.actions.backToSignIn)}
          newState='signIn'
        />
      </Grid>
    </Grid>
  </FormFooter>
)
