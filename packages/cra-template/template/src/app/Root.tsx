import React from 'react'
import { ThemeProvider } from 'styled-components'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'

import { AuthProvider } from '@auth'
import { theme } from './assets/theme'
import { AppRouter } from './Router'

export const Root = () => (
  <MuiThemeProvider theme={theme}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  </MuiThemeProvider>
)
