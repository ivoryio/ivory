import React from 'react'
import { Auth } from '@aws-amplify/auth'
import { ConsoleLogger as Logger } from '@aws-amplify/core'

import { useAuthContext } from '.'

const logger = new Logger('useForgotPassword')

export const useResetPassword = () => {
  const [delivery, setDelivery] = React.useState(null)
  const [username, setUsername] = React.useState('')

  const { handleStateChange } = useAuthContext()

  const requestCode = async (usernameValue: string): Promise<void> => {
    try {
      const data = await Auth.forgotPassword(usernameValue)
      setDelivery(data.CodeDeliveryDetails)
      setUsername(usernameValue)
    } catch (error) {
      logger.error(error)
      throw error
    }
  }

  const resetPassword = async (code: string, password: string): Promise<void> => {
    try {
      await Auth.forgotPasswordSubmit(username, code, password)
      handleStateChange('signIn')
    } catch (error) {
      logger.error(error)
      throw error
    }
  }

  return {
    username,
    delivery,
    resetPassword,
    requestCode,
  }
}
