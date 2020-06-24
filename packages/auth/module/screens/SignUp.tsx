import * as React from 'react'
import { Grid } from '@material-ui/core'
import { useForm } from 'react-hook-form'

import { t, i18nKeys } from 'locales/i18n'
import { useToast } from 'hooks/useToast'

import { DynamicForm } from 'app/components'
import { useSignUp } from '../hooks'
import { signUpLayout, signUpActions } from '../constants'
import { FormHeader, ChangeAuthStateLink, FormFooter } from '../components'

const authKeys = i18nKeys.auth

interface SignUpForm {
  email: string
  password: string
}

export const SignUp: React.FC = () => {
  const signUp = useSignUp()
  const { control, handleSubmit } = useForm<SignUpForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const { showToast: showNotification, Toast } = useToast()

  const onSubmit = async ({ email, password }: SignUpForm): Promise<void> => {
    try {
      await signUp(email, password)
    } catch (error) {
      const content = t(`auth.signUp.errors.${error.code}`, {
        defaultValue: error.message,
      })
      showNotification(content, 'error')
    }
  }

  return (
    <>
      <DynamicForm
        actions={signUpActions({ signUp: t(authKeys.signUp.actions.create) })}
        control={control}
        dataTestId='signUpForm'
        handleSubmit={handleSubmit}
        layout={signUpLayout({
          email: t(authKeys.labels.email),
          password: t(authKeys.labels.password),
        })}
        name='sign-up'
        onSubmit={onSubmit}
        FormHeader={() => (
          <FormHeader data-testid='sign-up-form-header'>{t(authKeys.signUp.header)}</FormHeader>
        )}
        FormFooter={() => <SignUpFormFooter />}
      />
      <Toast />
    </>
  )
}

const SignUpFormFooter = () => (
  <FormFooter>
    <Grid container>
      <Grid item xs>
        {t(authKeys.signUp.existingAccount)}{' '}
        <ChangeAuthStateLink label={t(authKeys.signUp.actions.signIn)} newState='signIn' />
      </Grid>
    </Grid>
  </FormFooter>
)
