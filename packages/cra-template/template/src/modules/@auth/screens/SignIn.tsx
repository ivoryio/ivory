import React from 'react'
import { useForm } from 'react-hook-form'
import { Grid } from '@material-ui/core'

import { DynamicForm } from 'app/components'
import { useToast } from 'hooks/useToast'
import { t, i18nKeys } from 'locales/i18n'

import { useSignIn } from '../hooks'
import { signInLayout, signInActions } from '../constants'
import { FormHeader, FormFooter, ChangeAuthStateLink } from '../components'

const authKeys = i18nKeys.auth
export interface SignInProps {
  hideSignUpLink?: boolean
  hideForgotPasswordLink?: boolean
}

interface SignInForm {
  email: string
  password: string
}

interface SignInFormFooterProps {
  hideForgotPasswordLink: boolean
  hideSignUpLink: boolean
}

export const SignIn: React.FC<SignInProps> = ({
  hideSignUpLink = false,
  hideForgotPasswordLink = false,
}: SignInProps) => {
  const signIn = useSignIn('/dashboard')
  const { showToast: showNotification, Toast } = useToast()
  const { control, handleSubmit } = useForm<SignInForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async ({ email, password }: SignInForm): Promise<void> => {
    try {
      await signIn(email, password)
    } catch (error) {
      const content = t(`auth.signIn.errors.${error.code}`, {
        defaultValue: error.message,
      })
      showNotification(content, 'error')
    }
  }

  return (
    <>
      <DynamicForm
        actions={signInActions({ signIn: t(authKeys.signIn.actions.signIn) })}
        control={control}
        dataTestId='signInForm'
        handleSubmit={handleSubmit}
        layout={signInLayout({
          email: t(authKeys.labels.email),
          password: t(authKeys.labels.password),
        })}
        name='sign-in'
        onSubmit={onSubmit}
        FormHeader={() => (
          <FormHeader data-testid='sign-in-form-header'>{t(authKeys.signIn.header)}</FormHeader>
        )}
        FormFooter={() => (
          <SignInFormFooter
            hideForgotPasswordLink={hideForgotPasswordLink}
            hideSignUpLink={hideSignUpLink}
          />
        )}
      />
      <Toast />
    </>
  )
}

const SignInFormFooter = ({ hideForgotPasswordLink, hideSignUpLink }: SignInFormFooterProps) => (
  <FormFooter>
    <Grid container>
      {!hideForgotPasswordLink && (
        <Grid item xs>
          <ChangeAuthStateLink
            newState='forgotPassword'
            label={t(authKeys.signIn.actions.forgotPassword)}
          />
        </Grid>
      )}
      {!hideSignUpLink && (
        <Grid item>
          <ChangeAuthStateLink newState='signUp' label={t(authKeys.signIn.actions.signUp)} />
        </Grid>
      )}
    </Grid>
  </FormFooter>
)
