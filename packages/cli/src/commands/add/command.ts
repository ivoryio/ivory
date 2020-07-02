import { red, bold } from 'chalk'

export const add = ({ addAuth, addEntity, addComponents }: AddSubcommands) => async (
  module: SupportedModule
): Promise<void> => {
  switch (module) {
    case 'auth':
      addAuth()
      break
    case 'components':
      addComponents()
      break
    case 'entity':
      await addEntity()
      break
    default:
      console.error(
        `${red('ERROR')} Invalid argument for ${bold('add')} command: ${module as string}`
      )
      break
  }
}
