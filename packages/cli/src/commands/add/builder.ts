import { add as buildAddCommand } from './command'
import { amplifyPush } from '../../actions/amplify'
import { inquireEntityParams } from '../../actions/inquire'
import {
  injectAuthCode,
  copyModuleTemplate,
  checkAmplifyApiExists,
  transformEntityTemplate,
  addEntityToGraphQLSchema,
} from './actions'

export const add = buildAddCommand({
  amplifyPush,
  injectAuthCode,
  copyModuleTemplate,
  inquireEntityParams,
  checkAmplifyApiExists,
  transformEntityTemplate,
  addEntityToGraphQLSchema,
})
