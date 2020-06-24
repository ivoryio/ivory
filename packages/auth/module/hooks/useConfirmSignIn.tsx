import { Auth } from '@aws-amplify/auth'
import { Logger } from '@aws-amplify/core'

import { useAuthContext } from './useAuthContext'

const logger = new Logger('useConfirmSignUp')

export const useConfirmSignIn = () => {
  const { handleStateChange, authData } = useAuthContext()
  const user = authData?.user ?? {}
  const mfaType = authData?.mfaType

  const confirm = async (code: string): Promise<void> => {
    try {
      await Auth.confirmSignIn(user, code, mfaType)
      handleStateChange('signedIn')
    } catch (error) {
      logger.error(error)
      throw error
    }
  }

  return {
    confirm,
  }
}
