import { join } from 'path'
import { readdirSync, existsSync, appendFileSync } from 'fs-extra'
import { red, green } from 'chalk'
import { template } from 'lodash'

export const addEntityToGraphQLSchema = (params: TransformEntityParams): void => {
  const graphqlFilePath = findSchemaPath()
  if (!graphqlFilePath) {
    return
  }
  updateGraphqlSchema(graphqlFilePath, params)
}

function findSchemaPath() {
  const projectRoot = process.cwd()
  const apiDirPath = join(projectRoot, 'amplify', 'backend', 'api')

  const apiDirs = readdirSync(apiDirPath)

  const graphqlApis = apiDirs.filter(dir => existsSync(join(apiDirPath, dir, 'schema.graphql')))
  if (graphqlApis.length !== 1) {
    console.error(
      `${red('error')} Couldn't locate a single 'schema.graphql' in the apis from '${green(
        apiDirPath
      )}' directory`
    )
    return false
  }
  return join(apiDirPath, graphqlApis[0], 'schema.graphql')
}

function updateGraphqlSchema(schemaPath: string, params: TransformEntityParams) {
  const schemaTemplate = `
type <%- name.singular %> @model {
  id: ID!<% _.forEach(attributes, attr => { %>
  <%- attr %>: String<% }) %>
}
`
  const makeSchema = template(schemaTemplate)
  const schema = makeSchema(params)

  appendFileSync(schemaPath, schema)
}
