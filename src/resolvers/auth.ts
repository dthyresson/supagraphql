import { GraphQLError } from 'graphql'
import * as jwt from 'jsonwebtoken'

import { supabase } from '../lib/supabase'

import type { User } from '../types/user'

export const signUp = async (
  email: string,
  password: string
): Promise<User> => {
  const { user, session, error } = await supabase.auth.signUp({
    email,
    password,
  })

  console.log(user)
  console.log(session?.access_token)

  if (error) {
    throw new GraphQLError(`Unable to sign up: ${error.message}`)
  }

  return user as User
}

export const signIn = async (
  email: string,
  password: string
): Promise<User> => {
  const { user, session, error } = await supabase.auth.signIn({
    email,
    password,
  })

  console.log(user)
  console.log(session?.access_token)

  if (error) {
    throw new GraphQLError(`Unable to sign up: ${error.message}`)
  }

  return { ...user, access_token: session?.access_token } as User
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
