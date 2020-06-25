import React from 'react'
import { Button as MuiButton, ButtonProps } from '@material-ui/core'

export const Button = ({ variant = 'contained', color = 'primary', ...props }: ButtonProps) => (
  <MuiButton variant={variant} color={color} {...props} />
)
