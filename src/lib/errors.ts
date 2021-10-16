import { EnvelopError, FormatErrorHandler } from '@envelop/core'
import { GraphQLError } from 'graphql'

/*
 * Prevent unexpected error messages from leaking to the GraphQL clients.
 *
 * Unexpected errors are those that are not Envelop or GraphQL errors
 **/
export const formatError: FormatErrorHandler = (err: any) => {
  if (
    err.originalError &&
    err.originalError instanceof EnvelopError === false &&
    err.originalError instanceof GraphQLError === false
  ) {
    return new GraphQLError('Something went wrong.')
  }

  return err
}
