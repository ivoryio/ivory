import { Auth } from '@aws-amplify/auth'

export { useAuthContext } from './hooks'
export { AuthProvider } from './AuthProvider'
export { ProtectedRoute } from './ProtectedRoute'
export { AuthenticationScreen } from './AuthenticationScreen'

export const signOut = (global = false) => Auth.signOut({ global })
