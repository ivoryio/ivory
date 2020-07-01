import { red, bold } from 'chalk'

export const add = (actions: AddEntityCommandActions) => (module: SupportedModule): void => {
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
      addEntity(actions)
      break
    default:
      console.error(
        `${red('ERROR')} Invalid argument for ${bold('add')} command: ${module as string}`
      )
      break
  }
}

function addEntity({ copyModuleTemplate, transformEntityTemplate, addEntityToGraphQLSchema }: AddEntityCommandActions) {
  // check amplify add api was done
  // inquire params
  const params = inquireEntityParams()

  addEntityToGraphQLSchema(params)
  // add params to graphql schema
  // amplify push
  copyModuleTemplate('entity', params.name.lower.singular)
  transformEntityTemplate(params)

  // opt1 inject Entity Code (client.ts, ApolloProvider in Root.tsx) and install deps
  // opt2 log how to continue
}

function inquireEntityParams() {
  const name = { singular: 'BillingInvoice', plural: 'BillingInvoices' }
  return {
    name: {
      ...changeFirstLetterCase(name, 'upper'),
      lower: changeFirstLetterCase(name, 'lower'),
    },
    attributes: ['name', 'description'],
  }
}

function changeFirstLetterCase(
  { singular, plural }: EntityName,
  target: 'lower' | 'upper'
): EntityName {
  let firstLetter = singular.slice(0, 1).toLowerCase()
  if (target === 'upper') {
    firstLetter = firstLetter.toUpperCase()
  }

  return {
    singular: `${firstLetter}${singular.slice(1)}`,
    plural: `${firstLetter}${plural.slice(1)}`,
  }
}
