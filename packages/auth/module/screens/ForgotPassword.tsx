import React from 'react'

import { useToast } from 'hooks/useToast'
import { useResetPassword } from '../hooks/useResetPassword'
import { ResetPassword, RequestPasswordResetCode } from '../components'

export const ForgotPassword: React.FC = () => {
  const { showToast: showNotification, Toast } = useToast()
  const { delivery, username, resetPassword, requestCode } = useResetPassword()
  return (
    <>
      {delivery || username ? (
        <ResetPassword
          requestCode={requestCode}
          username={username}
          resetPassword={resetPassword}
          onError={(msg: string) => showNotification(msg, 'error')}
        />
      ) : (
        <RequestPasswordResetCode
          requestCode={requestCode}
          onError={(msg: string) => showNotification(msg, 'error')}
        />
      )}
      <Toast />
    </>
  )
}
