import { ConsoleLogger } from '@aws-amplify/core'
import { useMutation, gql } from '@apollo/client'
import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api'

import { list{{entity.plural}} } from '../graphql/queries'
import { update{{entity.singular}} } from '../graphql/mutations'
import { Update{{entity.singular}}Input, Update{{entity.singular}}Mutation } from '../contracts'

const logger = new ConsoleLogger('@{{entity.lower.plural}}')

export const useUpdate{{entity.singular}} = () => {
  const [mutate] = useMutation(gql(update{{entity.singular}}), {
    context: {
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    },
    refetchQueries: gql(list{{entity.plural}}),
  })

  return async (input: Update{{entity.singular}}Input) => {
    const response = await mutate({
      variables: { input },
    })

    const { data, errors } = response as GraphQLResult<Update{{entity.singular}}Mutation>
    if (errors?.length) {
      logger.error(`An issue occured on update {{entity.lower.singular}}`, errors)
      return {
        isSuccess: false,
        errors,
      }
    }

    return {
      isSuccess: true,
      data: data?.update{{entity.singular}},
    }
  }
}
