/* eslint-disable @typescript-eslint/no-empty-interface */
import 'styled-components'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'

/**
 * This interface helps extend the Material-ui theme with custom properties
 */
interface CustomTheme {
  appBar?: {
    width?: React.CSSProperties['width']
    breakpoint?: Breakpoint
  }
}

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
