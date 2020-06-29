import React from 'react'
import { RouteComponentProps } from '@reach/router'

import { useAuthContext } from './hooks'
import { SignIn, SignUp, ConfirmSignIn, ConfirmSignUp, ForgotPassword, RequireNewPassword } from './screens'

export const AuthenticationScreen: React.FC<RouteComponentProps> = () => {
  const { authState } = useAuthContext()

  switch (authState) {
    case 'signUp':
      return <SignUp />
    case 'confirmSignIn':
      return <ConfirmSignIn />
    case 'confirmSignUp':
      return <ConfirmSignUp />
    case 'forgotPassword':
      return <ForgotPassword />
    case 'requireNewPassword':
      return <RequireNewPassword />
    default:
      return <SignIn />
  }
}
