import * as React from 'react'
import { Grid, Container } from '@material-ui/core'
import { useForm } from 'react-hook-form'

import { Button, Input } from 'app/components'
import { t, i18nKeys } from 'locales/i18n'
import { useToast } from 'hooks/useToast'

import { useSignUp } from '../hooks'
import { FormHeader, FormFooter, ChangeAuthStateLink } from '../components'

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
    <form data-testid='signUpForm' onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth='xs'>
        <FormHeader data-testid='sign-up-form-header'>{t(authKeys.signUp.header)}</FormHeader>
        <Input
          dataTestId='sign-up-username-input'
          name='email'
          label={t(authKeys.labels.email)}
          type='email'
          control={control}
          rules={{ required: true }}
        />
        <Input
          dataTestId='sign-up-password-input'
          name='password'
          label={t(authKeys.labels.password)}
          type='password'
          autoComplete='current-password'
          control={control}
          rules={{ required: true }}
        />
        <FormFooter>
          <Button data-testid='sign-up-btn' type='submit' fullWidth variant='contained' color='primary'>
            {t(authKeys.signUp.actions.create)}
          </Button>
          <Grid container>
            <Grid item xs>
              {t(authKeys.signUp.existingAccount)}{' '}
              <ChangeAuthStateLink label={t(authKeys.signUp.actions.signIn)} newState='signIn' />
            </Grid>
          </Grid>
        </FormFooter>
      </Container>
      <Toast />
    </form>
  )
}
