import React from 'react'
import { Typography, TypographyStyle } from '@material-ui/core'

interface DynamicStatusProps extends TypographyStyle {
  title: string | undefined
}

export const DynamicStatus = ({ title }: DynamicStatusProps) => (
  <Typography color='error' component='h2' variant='h6'>
    {title}
  </Typography>
)
