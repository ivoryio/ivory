import { add as buildAddCommand } from './command'
import { copyModuleTemplate, injectAuthCode, transformEntityTemplate } from './actions'

export const add = buildAddCommand({ copyModuleTemplate, injectAuthCode, transformEntityTemplate })
