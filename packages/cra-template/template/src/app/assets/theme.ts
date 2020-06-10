// eslint-disable-next-line @typescript-eslint/camelcase
import { unstable_createMuiStrictModeTheme, createMuiTheme, ThemeOptions } from '@material-ui/core'

/**
 * This object allows you to define the theme of the application.
 *
 * You should use it to customize and extend the material-ui theme.
 * If you want to add new properties you have to add them to the
 * `CustomTheme` interface in `styled.d.ts`
 */
const appTheme: ThemeOptions = {
  palette: {
    type: 'dark',
    primary: {
      main: '#2575FC',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: '#E54040',
    },
    background: {
      default: '#000A2B',
    },
  },
}

const isProduction = process.env.NODE_ENV && process.env.NODE_ENV === 'production'
export const theme = isProduction
  ? createMuiTheme(appTheme)
  : unstable_createMuiStrictModeTheme(appTheme)
