import { add as buildAddCommand } from './command'
import {
  injectAuthCode,
  copyModuleTemplate,
  checkAmplifyApiExists,
  transformEntityTemplate,
  addEntityToGraphQLSchema,
} from './actions'

export const add = buildAddCommand({
  injectAuthCode,
  copyModuleTemplate,
  checkAmplifyApiExists,
  transformEntityTemplate,
  addEntityToGraphQLSchema,
})
