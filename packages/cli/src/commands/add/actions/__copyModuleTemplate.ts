import chalk from 'chalk'
import { dirname, join } from 'path'
import { existsSync, copySync } from 'fs-extra'

export const copyModuleTemplate = (moduleName: string) => {
  const templateDir = join(dirname(require.resolve(`@ivoryio/${moduleName}`)), 'template')
  const moduleDir = join(process.cwd(), 'src', 'modules', `@${moduleName}`)

  if (existsSync(templateDir)) {
    copySync(templateDir, moduleDir)
  } else {
    console.error(`Could not locate supplied template: ${chalk.green(templateDir)}`)
    return
  }
}
