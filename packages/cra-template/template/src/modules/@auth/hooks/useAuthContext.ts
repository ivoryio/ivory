import { createContext, useContext } from 'react'

import { AuthContextProps } from '../contracts'

export const AuthContext = createContext<AuthContextProps>({
  authState: '',
  handleStateChange: () => {
    console.error('[@auth] Not initialized')
  },
})

export const useAuthContext = () => useContext(AuthContext)
