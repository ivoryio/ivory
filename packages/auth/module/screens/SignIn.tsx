import React from 'react'
import { useForm } from 'react-hook-form'
import { Grid, Container } from '@material-ui/core'

import { Button, Input } from 'app/components'
import { t, i18nKeys } from 'locales/i18n'
import { useToast } from 'hooks/useToast'

import { useSignIn } from '../hooks'
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
    <form data-testid='signInForm' onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth='xs'>
        <FormHeader data-testid='sign-in-form-header'>{t(authKeys.signIn.header)}</FormHeader>
        <Input
          dataTestId='sign-in-username-input'
          rules={{ required: true }}
          name='email'
          label={t(authKeys.labels.email)}
          type='email'
          control={control}
        />
        <Input
          dataTestId='sign-in-password-input'
          rules={{ required: true }}
          name='password'
          label={t(authKeys.labels.password)}
          type='password'
          autoComplete='current-password'
          control={control}
        />
        <FormFooter>
          <Button
            data-testid='sign-in-btn'
            type='submit'
            fullWidth
            color='primary'
            variant='contained'
          >
            {t(authKeys.signIn.actions.signIn)}
          </Button>
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
      </Container>
      <Toast />
    </form>
  )
}
