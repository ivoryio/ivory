import { red } from 'chalk'

export const log: LogAction = (message, level = 'info'): void => {
  if (level === 'error' || level === 'fatal') {
    console.error(`${red('error')} - ${message}`)
    if (level === 'fatal') {
      process.exit(1)
    }

    return
  }

  console.info(message)
}
