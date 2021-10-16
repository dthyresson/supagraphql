import { ResolveUserFn, ValidateUserFn } from '@envelop/generic-auth'
import { GraphQLError } from 'graphql'
import * as jwt from 'jsonwebtoken'

import { supabase } from '../lib/supabase'

import type { User } from '../schema/types'

/**
 * Used by Envelop's useExtendContext to set the
 * access_token in context.
 *
 * @param context
 * @returns access_token
 */
export const setAccessToken = (context) => {
  const headers = context.req['headers'] || {}
  if (headers['authorization']) {
    const authorization = headers['authorization']
    const token = authorization.split(' ')[1]

    return { access_token: token }
  }
}

/**
 * Verifies and decodes the Supabase JWT.
 *
 * If the token is invalid, expired, etc then
 * verification will raise an error.
 *
 * @param token
 * @returns the decoded token
 */
export const verifyToken = (token: string) => {
  if (!process.env.SUPABASE_JWT_SECRET) {
    console.error('SUPABASE_JWT_SECRET env var is not set.')
    throw new Error('SUPABASE_JWT_SECRET env var is not set.')
  }

  const secret = process.env.SUPABASE_JWT_SECRET as string
  return jwt.verify(token, secret)
}

/**
 * Here you can implement any custom sync/async code, and use the context built so far in Envelop and the HTTP request
 * to find the current user.
 *
 * Common practice is to use a JWT token here, validate it, and use the payload as-is, or fetch the user from an external services.
 * Make sure to either return `null` or the user object.
 */
export const resolveUserFn: ResolveUserFn<User> = async (context) => {
  try {
    if (!context.access_token) {
      return null
    } else {
      const session = verifyToken(context.access_token as string)
      const user = session as User

      return user
    }
  } catch (e) {
    context.req['log'].error(e, 'Failed to validate token')

    throw new GraphQLError(
      'Your credentials could not be verified. Please sign in again.'
    )
  }
}

/**
 *  Here you can implement any custom to check if the user is valid and have access to the server.
 *  By using the `protect-auth-directive` mode, you'll also get 2 additional parameters:
 *  the resolver parameters as object and the DirectiveNode of the auth directive.
 *
 * We set the token on the supabase client to be used to authenticate subsequent requests
 */
export const validateUser: ValidateUserFn<User> = async (user, context) => {
  // set the token to be used to authenticate subsequent requests
  supabase.auth.setAuth(context['access_token'] as string)

  if (!user) {
    throw new GraphQLError("You don't have access to do that.")
  }
}
