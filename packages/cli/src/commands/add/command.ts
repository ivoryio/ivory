import { red, bold, blue } from 'chalk'

export const add = (actions: AddEntityCommandActions) => async (module: SupportedModule): Promise<void> => {
  const { copyModuleTemplate, injectAuthCode } = actions

  switch (module) {
    case 'auth':
      copyModuleTemplate('auth')
      injectAuthCode()
      break
    case 'components':
      copyModuleTemplate('ui-components')
      break
    case 'entity':
      await addEntity(actions)
      break
    default:
      console.error(
        `${red('ERROR')} Invalid argument for ${bold('add')} command: ${module as string}`
      )
      break
  }
}

async function addEntity({
  amplifyPush,
  copyModuleTemplate,
  inquireEntityParams,
  checkAmplifyApiExists,
  transformEntityTemplate,
  addEntityToGraphQLSchema,
}: AddEntityCommandActions) {

  const apiExists = checkAmplifyApiExists()
  if (!apiExists) {
    console.error(
      `${red('error')} No amplify api found. Please make sure you've added an api by running ${blue(
        'amplify add api'
      )}`
    )
    process.exit(1)
  }

  const params = await inquireEntityParams()

  addEntityToGraphQLSchema(params)
  amplifyPush()
  // extract queries, mutations and subscription
  copyModuleTemplate('entity', params.name.lower.singular)
  transformEntityTemplate(params)

  // opt1 inject Entity Code (client.ts, ApolloProvider in Root.tsx) and install deps
  // opt2 log how to continue
}
