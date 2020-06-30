import { join } from 'path'
import { red, bold } from 'chalk'
import { template, templateSettings, capitalize } from 'lodash'
import { readFileSync, writeFileSync, renameSync } from 'fs-extra'

export const add = ({ copyModuleTemplate, injectAuthCode }: AddEntityCommandActions) => (
  module: SupportedModule
): void => {
  let params

  switch (module) {
    case 'auth':
      copyModuleTemplate('auth')
      injectAuthCode()
      break
    case 'components':
      copyModuleTemplate('ui-components')
      break
    case 'entity':
      // inquire params
      // amplify push
      // copy and 'populate' template
      params = {
        name: { singular: 'BillingInvoice', plural: 'BillingInvoices' },
        attributes: ['name', 'description'],
      }
      copyModuleTemplate('entity', params.name.singular)
      transformTemplate(params.name, params.attributes)

      // inject Entity Code
      break
    default:
      console.error(
        `${red('ERROR')} Invalid argument for ${bold('add')} command: ${module as string}`
      )
      break
  }
}

const entityFiles = [
  `hooks/useCreate{{entity}}.ts`,
  `hooks/useDelete{{entity}}.ts`,
  `hooks/use{{entity}}.ts`,
  `hooks/use{{entity}}List.ts`,
  `hooks/useUpdate{{entity}}.ts`,
  `screens/Create{{entity}}.tsx`,
  `screens/{{entity}}List.tsx`,
  `index.ts`,
]

templateSettings.interpolate = /{{([\s\S]+?)}}/g

function transformTemplate(moduleName: EntityName, attributes: string[]) {
  const projectRoot = process.cwd()
  const modulePath = join(projectRoot, 'src', 'modules', `@${moduleName.singular}`)
  const entity = {
    ...moduleName,
    lower: toLower(moduleName),
  }

  entityFiles.forEach(f => {
    const filePath = join(modulePath, f)
    const contents = readFileSync(filePath, 'utf8')
    const transform = template(contents)
    writeFileSync(filePath, transform({ entity, attributes }))
    renameSync(filePath, filePath.replace('{{entity}}', entity.singular))
  })
}

function toLower({ singular, plural }: EntityName): EntityName {
  return {
    singular: `${singular.slice(0, 1).toLowerCase()}${singular.slice(1)}`,
    plural: `${plural.slice(0, 1).toLowerCase()}${plural.slice(1)}`,
  }
}

interface EntityName {
  singular: string
  plural: string
}
