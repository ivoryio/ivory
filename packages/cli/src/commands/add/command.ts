import { red, bold } from 'chalk'

export const add = ({ copyModuleTemplate, injectAuthCode }: AddEntityCommandActions) => (
  module: SupportedModule
): void => {
  switch (module) {
    case 'auth':
      copyModuleTemplate('auth')
      injectAuthCode()
      break
    case 'components':
      copyModuleTemplate('ui-components')
      break
    default:
      console.error(`${red('ERROR')} Invalid argument for ${bold('add')} command: ${module}`)
      break
  }
}
