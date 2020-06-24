import { join } from 'path'
import { sed } from 'shelljs'

const importLocation = '/* IMPORT-LOCATION */'

export const injectAuthCode = (): void => {
  injectAuthProvider()
  injectAuthRoutes()
  injectAliasConfig()
}

function injectAuthProvider() {
  const rootComponent = join(process.cwd(), 'src', 'app', 'Root.tsx')

  const startLocation = '{/* PROVIDERS-START */}'
  const endLocation = '{/* PROVIDERS-END */}'
  const importStatement = `import { AuthProvider } from '@auth'`
  const tagOpen = '<AuthProvider>\n'
  const tagClose = '</AuthProvider>\n'

  sed('-i', escape(importLocation), `${importLocation}\n${importStatement}`, rootComponent)
  sed('-i', escape(startLocation), `${tagOpen}      ${startLocation}`, rootComponent)
  sed('-i', escape(endLocation), `${tagClose}      ${endLocation}`, rootComponent)
}

function injectAuthRoutes() {
  const routerComponent = join(process.cwd(), 'src', 'app', 'Router.tsx')
  const importStatement = `import { AuthenticationScreen, ProtectedRoute } from '@auth'`
  const routeLocation = `<DashboardScreen path='/dashboard' />`
  const authRoutes = `<ProtectedRoute component={DashboardScreen} path='/dashboard' />
    <AuthenticationScreen path='/auth' />`

  sed('-i', escape(importLocation), `${importLocation}\n${importStatement}`, routerComponent)
  sed('-i', escape(routeLocation), `${authRoutes}`, routerComponent)
}

function injectAliasConfig() {
  const tsconfig = join(process.cwd(), 'tsconfig.alias.json')
  const aliasLocation = `"paths": {`
  const authAlias = `      "@auth": [ "./modules/@auth" ],`

  sed('-i', escape(aliasLocation), `${aliasLocation}\n${authAlias}`, tsconfig)
}

function escape(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
