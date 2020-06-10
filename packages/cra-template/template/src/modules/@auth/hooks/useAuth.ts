import { Auth } from '@aws-amplify/auth'
import { HubCapsule } from '@aws-amplify/core/lib/Hub'
import { Hub, ConsoleLogger } from '@aws-amplify/core'
import { useState, useCallback, useEffect } from 'react'

import { getUserData } from './getUserData'
import { AuthData, AuthState, AuthContextProps, ValidAuthState } from '../contracts'

const logger = new ConsoleLogger('useAuth')

export const useAuth = (): AuthContextProps => {
  const [state, setState] = useState<AuthState>({
    authState: '',
  })

  const handleStateChange = useCallback((authState: ValidAuthState, authData?: AuthData) => {
    if (authState === 'signedOut') {
      authState = 'signIn'
    }

    setState(state => {
      logger.debug(`state changed '${state.authState}' -> '${authState}'`, authData)
      return { authState, authData }
    })
  }, [])

  useEffect(() => {
    const checkUser = async (): Promise<void> => {
      try {
        const user = await Auth.currentAuthenticatedUser()
        handleStateChange('signedIn', getUserData(user))
      } catch (error) {
        handleStateChange('signIn')
      }
    }
    checkUser()
  }, [handleStateChange])

  useEffect(() => {
    const handleAuthEvent = createAuthHandler(handleStateChange)
    Hub.listen('auth', handleAuthEvent)

    return (): void => {
      Hub.remove('auth', handleAuthEvent)
    }
  })

  return {
    ...state,
    handleStateChange,
  }
}

function createAuthHandler(
  handleStateChange: (authState: ValidAuthState, authData?: AuthData) => void
) {
  return ({ payload }: HubCapsule): void => {
    const { event, data } = payload

    switch (event) {
      case 'cognitoHostedUI':
        handleStateChange('signedIn', data)
        break
      case 'cognitoHostedUI_failure':
        handleStateChange('signIn')
        break
      case 'parsingUrl_failure':
        handleStateChange('signIn')
        break
      case 'signOut':
        handleStateChange('signIn')
        break
      case 'customGreetingSignOut':
        handleStateChange('signIn')
        break
      default:
        //TODO
        break
    }
  }
}
