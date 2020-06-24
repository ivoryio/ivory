export interface AuthContextProps extends AuthState {
  handleStateChange: (authState: ValidAuthState, authData?: AuthData) => void
}

export interface User {
  username?: string
  groups?: string[]
  email?: string
  name?: string
}

export interface AuthData extends User {
  [key: string]: unknown
  user?: object
  mfaType?: 'SMS_MFA' | 'SOFTWARE_TOKEN_MFA' | null | undefined
}

export type ValidAuthState =
  | ''
  | 'signIn'
  | 'signedOut'
  | 'signedUp'
  | 'signUp'
  | 'signedIn'
  | 'forgotPassword'
  | 'requireNewPassword'
  | 'confirmSignIn'
  | 'confirmSignUp'

export interface AuthState {
  authState: ValidAuthState
  authData?: AuthData
}
