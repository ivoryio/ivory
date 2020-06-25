import Auth from '@aws-amplify/auth'
import { ConsoleLogger as Logger } from '@aws-amplify/core'

import { useAuthContext } from '.'

const logger = new Logger('useSignUp')

export const useSignUp = (): ((
  username: string,
  password: string,
  validationData?: Record<string, string>
) => Promise<void>) => {
  const { handleStateChange } = useAuthContext()

  return async (email: string, password: string): Promise<void> => {
    const signupInfo = {
      username: email,
      password: password,
      attributes: {},
    }

    try {
      const data = await Auth.signUp(signupInfo)
      handleStateChange('confirmSignUp', { username: data.user.getUsername() })
    } catch (error) {
      logger.error(error)
      throw error
    }
  }
}
