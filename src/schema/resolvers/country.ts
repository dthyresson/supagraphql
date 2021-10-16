import { GraphQLError } from 'graphql'

import { supabase } from '../../lib/supabase'

import type {
  Country,
  MutationDeleteCountryArgs,
  MutationCreateCountryArgs,
  MutationUpdateCountryArgs,
} from '../types/index'

export const country = async (id: number, context): Promise<Country> => {
  const { data: country, error } = await supabase
    .from('countries')
    .select('id, name, local_name, continent, iso2, iso3')
    .eq('id', id)
    .single()

  if (error) {
    context.req['log'].error(error, error.message)
    throw new GraphQLError('Country not found')
  }

  return country
}

export const countries = async (context): Promise<[Country]> => {
  const { data: countries, error } = await supabase
    .from('countries')
    .select('id, name, local_name, continent, iso2, iso3')
    .order('name', { ascending: true })

  if (error) {
    context.req['log'].error(error, error.message)
    throw new GraphQLError('Could not fetch Countries.')
  }

  return countries as [Country]
}

export const createCountry = async (
  { input }: MutationCreateCountryArgs,
  context
): Promise<Country> => {
  const { data: countries, error } = await supabase
    .from('countries')
    .insert([input])

  if (!countries || error) {
    context.req['log'].error(error, error.message)
    throw new GraphQLError('Country could not be created')
  }

  return countries && (countries[0] as Country)
}

export const deleteCountry = async (
  { id }: MutationDeleteCountryArgs,
  context
): Promise<Country> => {
  const { data: countries, error } = await supabase
    .from('countries')
    .delete()
    .eq('id', id)

  if (!countries || error) {
    context.req['log'].error(error, error.message)
    throw new GraphQLError('Country could not be deleted')
  }

  return countries && (countries[0] as Country)
}

export const updateCountry = async (
  { id, input }: MutationUpdateCountryArgs,
  context
): Promise<Country> => {
  const { data: countries, error } = await supabase
    .from('countries')
    .update(input)
    .eq('id', id)

  if (!countries || error) {
    context.req['log'].error(error, error.message)
    throw new GraphQLError('Country could not be updated')
  }

  return countries && (countries[0] as Country)
}
