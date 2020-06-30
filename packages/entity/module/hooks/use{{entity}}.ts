import { ConsoleLogger } from '@aws-amplify/core'
import { useQuery, gql } from '@apollo/client'

import { {{entity.singular}} } from '../contracts'
import { get{{entity.singular}} } from '../graphql/queries'

const logger = new ConsoleLogger('@{{entity.lower.singular}}')

export const use{{entity.singular}} = ({{entity.lower.singular}}Id: string) => {
  const { loading, data, error } = useQuery(gql(get{{entity.singular}}), {
    variables: { id: {{entity.lower.singular}}Id },
  })

  const {{entity.lower.singular}}: {{entity.singular}} = data?.get{{entity.singular}} ?? {}

  if (error) {
    logger.error(`An issue occured when retrieving {{entity.lower.singular}} ${ {{entity.lower.singular}}Id }`, error)
  }

  return { loading, {{entity.lower.singular}} }
}
