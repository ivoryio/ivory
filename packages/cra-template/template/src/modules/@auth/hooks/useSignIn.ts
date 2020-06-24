import { Auth } from '@aws-amplify/auth'
import { navigate } from '@reach/router'
import { ConsoleLogger } from '@aws-amplify/core'

import { useAuthContext } from '.'
import { getUserData } from './getUserData'

const logger = new ConsoleLogger('useSignIn')

export const useSignIn = (
  postSignInRoute = '/'
): ((
  username: string,
  password: string,
  validationData?: Record<string, string>
) => Promise<void>) => {
  const { authState, handleStateChange } = useAuthContext()
  if (authState === 'signedIn') {
    navigate(postSignInRoute)
  }

  return async (username: string, password: string): Promise<void> => {
    try {
      const user = await Auth.signIn({
        username,
        password,
      })
      logger.debug(user)
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        logger.debug('require new password', user.challengeParam)
        handleStateChange('requireNewPassword', user)
      } else if (user.challengeName === 'SMS_MFA' || user.challengeName === 'SOFTWARE_TOKEN_MFA') {
        logger.debug('confirm user with ' + user.challengeName)
        handleStateChange('confirmSignIn', { user, mfaType: user.challengeName })
        // } else if (user.challengeName === 'MFA_SETUP') {
        //   logger.debug('TOTP setup', user.challengeParam)
        //   handleStateChange('TOTPSetup', user)
      } else {
        handleStateChange('signedIn', getUserData(user))
        navigate(postSignInRoute)
      }
    } catch (error) {
      if (error.code === 'UserNotConfirmedException') {
        logger.debug('the user is not confirmed')
        handleStateChange('confirmSignUp', { username })
      } else if (error.code === 'PasswordResetRequiredException') {
        logger.debug('the user requires a new password')
        handleStateChange('forgotPassword', { username })
      } else {
        logger.error(error)
        throw error
      }
    }
  }
}
