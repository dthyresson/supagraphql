import { GraphQLError } from 'graphql'

import { supabase } from '../../lib/supabase'

import type { User } from '../types/index'

export const signUp = async (
  email: string,
  password: string
): Promise<User> => {
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  })

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

  if (error) {
    throw new GraphQLError(`Unable to sign in: ${error.message}`)
  }

  return { ...user, access_token: session?.access_token } as User
}
