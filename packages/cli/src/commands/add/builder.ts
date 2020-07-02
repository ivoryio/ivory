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

import {
  addEntity as buildAddEntity,
  addAuth as buildAddAuth,
  addComponents as buildAddComponents,
} from './subcommands'

const addAuth = buildAddAuth({
  injectAuthCode,
  copyModuleTemplate,
})

const addEntity = buildAddEntity({
  amplifyPush,
  copyModuleTemplate,
  inquireEntityParams,
  checkAmplifyApiExists,
  transformEntityTemplate,
  addEntityToGraphQLSchema,
})

const addComponents = buildAddComponents({
  copyModuleTemplate,
})

export const add = buildAddCommand({ addEntity, addComponents, addAuth })
