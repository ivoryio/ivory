import { red, blue } from 'chalk'

export const addEntity = ({
  amplifyPush,
  copyModuleTemplate,
  inquireEntityParams,
  checkAmplifyApiExists,
  transformEntityTemplate,
  addEntityToGraphQLSchema,
}: AddEntityCommandActions) => async (): Promise<void> => {
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
