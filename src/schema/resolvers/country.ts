import { GraphQLError } from 'graphql'

import { supabase } from '../../lib/supabase'

import type {
  Country,
  QueryCountriesForContinentArgs,
  MutationDeleteCountryArgs,
  MutationCreateCountryArgs,
  MutationUpdateCountryArgs,
} from '../types/index'

/**
 * Fetch a Country by id
 *
 * @param id
 * @param context
 * @returns the Country
 */
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

/**
 * Fetch all Countries
 *
 * @param context
 * @returns an array of Country
 */
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

/**
 * Fetch all Countries for a Continent
 *
 * @param context
 * @returns an array of Country
 */
export const countriesForContinent = async (
  { continent }: QueryCountriesForContinentArgs,
  context
): Promise<[Country]> => {
  const { data: countries, error } = await supabase
    .from('countries')
    .select('id, name, local_name, continent, iso2, iso3')
    .eq('continent', continent)
    .order('name', { ascending: true })

  context.req['log'].debug(continent)

  if (error) {
    context.req['log'].error(error, error.message)
    throw new GraphQLError('Could not fetch Countries.')
  }

  return countries as [Country]
}

/**
 * Insert a new Country
 *
 *  Note: requires authentication via the @auth directive on the mutation
 *
 * @param input The attributes for the new Country
 * @param context
 * @returns
 */
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

/**
 * Delete a Country
 *
 * Note: requires authentication via the @auth directive on the mutation
 *
 * @param id of the Country to delete
 * @param context
 * @returns
 */
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

/**
 * Update a Country
 *
 * Note: requires authentication via the @auth directive on the mutation
 *
 * @param id pf the Country
 * @param input attributes to modify on th given Country
 * @param context
 * @returns
 */
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
