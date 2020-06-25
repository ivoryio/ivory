import React, { ReactNode } from 'react'

import { useAuth } from './hooks/useAuth'
import { AuthContext } from './hooks'

export const AuthProvider: React.FC = ({ children }: { children?: ReactNode }) => {
  const contextValues = useAuth()

  return <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>
}
