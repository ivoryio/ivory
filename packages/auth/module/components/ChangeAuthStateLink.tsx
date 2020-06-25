import * as React from 'react'

import { useAuthContext } from '../hooks'
import { AuthData, ValidAuthState } from '../contracts'

export interface ChangeAuthStateLinkProps {
  label: string
  newState: ValidAuthState
  authData?: AuthData
}

export const ChangeAuthStateLink: React.FC<ChangeAuthStateLinkProps> = ({
  label,
  newState,
  authData,
}: ChangeAuthStateLinkProps) => {
  const { handleStateChange } = useAuthContext()

  return (
    <span
      data-testid={`${newState}-link`}
      onClick={(): void => handleStateChange(newState, authData)}
    >
      {label}
    </span>
  )
}
