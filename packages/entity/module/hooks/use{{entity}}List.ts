import { ConsoleLogger } from '@aws-amplify/core'
import { useQuery, gql } from '@apollo/client'

import { {{entity.singular}} } from '../contracts'
import { list{{entity.plural}} } from '../graphql/queries'

const logger = new ConsoleLogger('@{{entity.lower.singular}}')

export const use{{entity.singular}}List = () => {
  const { loading, data, error } = useQuery(gql(list{{entity.plural}}))
  const {{entity.lower.plural}}: {{entity.singular}}[] = data?.list{{entity.plural}}?.items ?? []

  if (error) {
    logger.error('An issue occured when retrieving {{entity.lower.plural}}', error)
  }

  return { loading, {{entity.lower.plural}} }
}
