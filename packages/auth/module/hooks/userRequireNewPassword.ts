import { Auth } from '@aws-amplify/auth'
import { ConsoleLogger as Logger } from '@aws-amplify/core'

import { getUserData } from './getUserData'
import { useAuthContext } from './useAuthContext'

const logger = new Logger('useRequireNewPassword')

export const useRequireNewPassword = (): ((password: string) => Promise<void>) => {
  const { authData: user, handleStateChange } = useAuthContext()

  return async (password: string): Promise<void> => {
    try {
      const updatedUser = await Auth.completeNewPassword(user, password, undefined)

      logger.debug('complete new password', updatedUser)

      if (updatedUser.challengeName === 'SMS_MFA') {
        logger.debug('SMS_MFA', updatedUser.challengeParam)
        // handleStateChange('confirmSignIn', updatedUser)
      } else if (updatedUser.challengeName === 'MFA_SETUP') {
        logger.debug('TOTP setup', updatedUser.challengeParam)
        // handleStateChange('TOTPSetup', updatedUser)
      } else {
        handleStateChange('signedIn', getUserData(updatedUser))
      }
    } catch (error) {
      logger.error(error)
      throw error
    }
  }
}
