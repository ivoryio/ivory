import { ConsoleLogger } from '@aws-amplify/core'
import { useMutation, gql } from '@apollo/client'
import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api'

import { list{{entity.plural}} } from '../graphql/queries'
import { delete{{entity.singular}} } from '../graphql/mutations'
import { Delete{{entity.singular}}Input, Delete{{entity.singular}}Mutation } from '../contracts'

const logger = new ConsoleLogger('@{{entity.lower.plural}}')

export const useDelete{{entity.singular}} = () => {
  const [mutate] = useMutation(gql(delete{{entity.singular}}), {
    context: {
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    },
    refetchQueries: gql(list{{entity.plural}}),
  })

  return async (input: Delete{{entity.singular}}Input) => {
    const response = await mutate({
      variables: { input },
    })

    const { data, errors } = response as GraphQLResult<Delete{{entity.singular}}Mutation>
    if (errors?.length) {
      logger.error(`An issue occured on delete {{entity.lower.singular}}`, errors)
      return {
        isSuccess: false,
        errors,
      }
    }

    return {
      isSuccess: true,
      data: data?.delete{{entity.singular}},
    }
  }
}
