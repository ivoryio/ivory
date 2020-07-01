import { join } from 'path'
import { template, templateSettings } from 'lodash'
import { readFileSync, writeFileSync, renameSync } from 'fs-extra'

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

export const transformEntityTemplate = ({ name, attributes }: EntityParams): void => {
  const projectRoot = process.cwd()
  const modulePath = join(projectRoot, 'src', 'modules', `@${name.singular}`)

  entityFiles.forEach(f => {
    const filePath = join(modulePath, f)
    const contents = readFileSync(filePath, 'utf8')
    const transform = template(contents)
    writeFileSync(filePath, transform({ entity: name, attributes }))
    renameSync(filePath, filePath.replace('{{entity}}', name.singular))
  })
}
