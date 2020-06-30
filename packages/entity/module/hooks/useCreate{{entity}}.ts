import { ConsoleLogger } from '@aws-amplify/core'
import { useMutation, gql } from '@apollo/client'
import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api'

import { list{{entity.plural}} } from '../graphql/queries'
import { create{{entity.singular}} } from '../graphql/mutations'
import { Create{{entity.singular}}Input, Create{{entity.singular}}Mutation } from '../contracts'

const logger = new ConsoleLogger('@{{entity.lower.singular}}')

export const useCreate{{entity.singular}} = () => {
  const [mutate] = useMutation(gql(create{{entity.singular}}), {
    // context: {
    //   authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    // },
    refetchQueries: gql(list{{entity.plural}}),
  })

  return async (input: Create{{entity.singular}}Input) => {
    const response = await mutate({
      variables: { input },
    })

    const { data, errors } = response as GraphQLResult<Create{{entity.singular}}Mutation>
    if (errors?.length) {
      logger.error(`An issue occured on create {{entity.lower.singular}}`, errors)
      return {
        isSuccess: false,
        errors,
      }
    }

    return {
      isSuccess: true,
      data: data?.create{{entity.singular}},
    }
  }
}
