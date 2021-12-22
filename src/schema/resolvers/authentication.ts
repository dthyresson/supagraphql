import { GraphQLError } from 'graphql'

import { supabase } from '../../lib/supabase'

import type { User } from '../types/index'

/**
 * Supabase sign up via GraphQL Mutation
 *
 * @param email
 * @param password
 * @returns
 */
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

/**
 /**
 * Supabase sign in via GraphQL Mutation.
 *
 * Provides a JWT access token to be used to authorize
 * subsequent GraphQL requests.
 *
 * @param email
 * @param password
 * @returns
 */
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

/**
 /**
 * Supabase update user via GraphQL Mutation.
 *
 * Provides a JWT access token to be used to authorize
 * subsequent GraphQL requests.
 *
 * @returns
 */
export const updateRoles = async (roles: string): Promise<any> => {
  console.log('>>>>> updateRoles')

  const { data, error } = await supabase.rpc('set_roles', {
    roles: "['foo', 'goo']",
  })

  if (error) {
    throw new GraphQLError(`Unable to sign in: ${error.message}`)
  }

  console.log(data)
  console.log(roles)

  return { ...data }
}
