import * as React from 'react'
import styled, { css } from 'styled-components'
import { LockOutlined } from '@material-ui/icons'
import { Avatar as _Avatar, Typography, Box as _Box } from '@material-ui/core'

export const FormHeader: React.FC = ({ children, ...props }: React.PropsWithChildren<{}>) => {
  return (
    <Box {...props}>
      <Avatar>
        <LockOutlined />
      </Avatar>
      <Typography component='h2' variant='h6'>
        {children}
      </Typography>
    </Box>
  )
}

const Box = styled(_Box)`
  display: flex;
  margin-top: ${({ theme }) => theme.spacing(1)}px;
  flex-direction: column;
  align-items: center;
`

const Avatar = styled(_Avatar)(
  ({ theme }) => css`
    margin-top: ${theme.spacing(1)}px;
    background-color: ${theme.palette.secondary.main};
  `
)
