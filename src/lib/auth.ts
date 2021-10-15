import { ResolveUserFn, ValidateUserFn } from '@envelop/generic-auth'
import * as jwt from 'jsonwebtoken'

import { supabase } from '../lib/supabase'

import type { User } from '../types/user'

export const setAccessToken = (context) => {
  const headers = context.req['headers'] || {}
  if (headers['authorization']) {
    const authorization = headers['authorization']
    const token = authorization.split(' ')[1]

    return { access_token: token }
  }
}

export const verifyToken = (token: string) => {
  if (!process.env.SUPABASE_JWT_SECRET) {
    console.error('SUPABASE_JWT_SECRET env var is not set.')
    throw new Error('SUPABASE_JWT_SECRET env var is not set.')
  }

  try {
    const secret = process.env.SUPABASE_JWT_SECRET as string
    return jwt.verify(token, secret)
  } catch (error) {
    console.error(error)
    throw Error('Could not verify token')
  }
}

export const resolveUserFn: ResolveUserFn<User> = async (context) => {
  // Here you can implement any custom sync/async code, and use the context built so far in Envelop and the HTTP request
  // to find the current user.
  // Common practice is to use a JWT token here, validate it, and use the payload as-is, or fetch the user from an external services.
  // Make sure to either return `null` or the user object.

  try {
    if (!context.access_token) {
      throw Error('Missing token')
    } else {
      const session = verifyToken(context.access_token as string)

      const user = { ...session } as User

      return user
    }
  } catch (e) {
    context.req['log'].error('Failed to validate token')

    return null
  }
}
export const validateUser: ValidateUserFn<User> = async (user, context) => {
  // set the token to be used to authenticate subsequent requests
  supabase.auth.setAuth(context['access_token'] as string)

  // Here you can implement any custom to check if the user is valid and have access to the server.
  // By using the `protect-auth-directive` mode, you'll also get 2 additional parameters:
  // the resolver parameters as object and the DirectiveNode of the auth directive.

  if (!user) {
    throw new Error(`Unauthenticated!`)
  }
}
