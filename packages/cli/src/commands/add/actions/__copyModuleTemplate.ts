import { red, cyan } from 'chalk'
import { dirname, join } from 'path'
import { existsSync, copySync } from 'fs-extra'

export const copyModuleTemplate = (moduleName: string): void => {
  const projectRoot = process.cwd()
  const moduleSrc = dirname(require.resolve(`@ivoryio/${moduleName}`))
  const templateDir = join(moduleSrc, 'module')
  const testSrcDir = join(moduleSrc, 'cypress')
  const testTargetDir = join(projectRoot, 'cypress')
  const moduleDir = join(projectRoot, 'src', 'modules', `@${moduleName}`)

  if (existsSync(templateDir)) {
    copySync(templateDir, moduleDir)
    if (existsSync(testSrcDir)) {
      copySync(testSrcDir, testTargetDir)
    }
  } else {
    console.error(`${red('error')} Could not locate supplied template: ${cyan(templateDir)}`)
  }
}
