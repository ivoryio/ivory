import { add as buildAddCommand } from './command'
import { copyModuleTemplate, injectAuthCode } from './actions'

export const add = buildAddCommand({ copyModuleTemplate, injectAuthCode })
