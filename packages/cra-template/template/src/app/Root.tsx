import React from 'react'
import { ThemeProvider } from 'styled-components'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'

/* IMPORT-LOCATION */
import { theme } from './assets/theme'
import { AppRouter } from './Router'

export const Root = () => (
  <MuiThemeProvider theme={theme}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* PROVIDERS-START */}
        <AppRouter />
      {/* PROVIDERS-END */}
    </ThemeProvider>
  </MuiThemeProvider>
)
