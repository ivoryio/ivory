import React from 'react'
import { Alert, AlertProps } from '@material-ui/lab'
import { Snackbar, SnackbarOrigin } from '@material-ui/core'

export interface ToastProps {
  isOpen: boolean
  content: string
  className?: string
  action?: React.ReactNode
  autoHideDuration?: number
  anchorOrigin?: SnackbarOrigin
  variant?: AlertProps['severity']
  onClose: (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => void
}

export const Toast: React.FC<ToastProps> = ({
  isOpen,
  action,
  content,
  onClose,
  variant = 'info',
  anchorOrigin = {
    vertical: 'top',
    horizontal: 'right',
  },
  autoHideDuration = 5000,
}: ToastProps) => (
  <Snackbar
    open={isOpen}
    onClose={onClose}
    anchorOrigin={anchorOrigin}
    autoHideDuration={autoHideDuration}
  >
    <Alert variant='filled' onClose={onClose} severity={variant} action={action}>
      {content}
    </Alert>
  </Snackbar>
)
