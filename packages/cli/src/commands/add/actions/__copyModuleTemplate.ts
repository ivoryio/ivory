import chalk from 'chalk'
import { dirname, join } from 'path'
import { existsSync, copySync } from 'fs-extra'

export const copyModuleTemplate = (moduleName: string): void => {
  const projectRoot = process.cwd()
  const moduleSrc = dirname(require.resolve(`@ivoryio/${moduleName}`))
  const templateDir = join(moduleSrc, 'module')
  const testDir = join(moduleSrc, 'cypress')
  const moduleDir = join(projectRoot, 'src', 'modules', `@${moduleName}`)

  if (existsSync(templateDir)) {
    copySync(templateDir, moduleDir)
    if (existsSync(testDir)) {
      copySync(testDir, projectRoot)
    }
  } else {
    console.error(`Could not locate supplied template: ${chalk.green(templateDir)}`)
  }
}
