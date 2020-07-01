import { add as buildAddCommand } from './command'
import {
  copyModuleTemplate,
  injectAuthCode,
  transformEntityTemplate,
  addEntityToGraphQLSchema,
} from './actions'

export const add = buildAddCommand({
  copyModuleTemplate,
  injectAuthCode,
  transformEntityTemplate,
  addEntityToGraphQLSchema,
})
