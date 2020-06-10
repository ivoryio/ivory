import { Auth } from '@aws-amplify/auth'
import { Logger } from '@aws-amplify/core'

import { useAuthContext } from './useAuthContext'

const logger = new Logger('useConfirmSignUp')

export const useConfirmSignUp = () => {
  const { handleStateChange, authData } = useAuthContext()
  const username = authData?.username ?? ''

  const confirm = async (code: string): Promise<void> => {
    try {
      await Auth.confirmSignUp(username, code)
      handleStateChange('signedUp')
    } catch (error) {
      logger.error(error)
      throw error
    }
  }

  const resend = async (): Promise<void> => {
    try {
      await Auth.resendSignUp(username)
      logger.debug('code resent')
    } catch (error) {
      logger.error(error)
      throw error
    }
  }

  return {
    confirm,
    resend,
  }
}
