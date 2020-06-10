import React from 'react'
import { useAuthContext } from './hooks'
import { Redirect, RouteComponentProps } from '@reach/router'

interface Props {
  component?: React.FC
}

type ProtectedRouteProps = RouteComponentProps<React.PropsWithChildren<Props>>

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  component: Component,
}: ProtectedRouteProps) => {
  const { authState } = useAuthContext()
  if (authState === '') {
    return null
  }

  if (authState !== 'signedIn') {
    return <Redirect to='/auth' noThrow />
  }

  if (Component) {
    return <Component />
  }
  return <>{children}</>
}
