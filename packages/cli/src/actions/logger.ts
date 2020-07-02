import { red } from 'chalk'

export const log: LogAction = (message, level = 'info'): void => {
  if (level === 'error') {
    console.error(`${red('error')} - ${message}`)
  }
  console.info(message)
}
