import { join } from 'path'
import { existsSync } from 'fs-extra'

export const checkAmplifyApiExists = (): boolean => {
  const projectRoot = process.cwd()
  const apiDirPath = join(projectRoot, 'amplify', 'backend', 'api')

  return existsSync(apiDirPath)
}
