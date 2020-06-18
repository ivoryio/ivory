import { add as buildAddCommand } from './command'
import { copyModuleTemplate } from './actions'

export const add = buildAddCommand({ copyModuleTemplate })
