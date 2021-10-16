import { GraphQLError } from 'graphql'

import { supabase } from '../../lib/supabase'

import type { Country } from '../types/country'

export const country = async (id: number): Promise<Country> => {
  const { data: country, error } = await supabase
    .from('countries')
    .select('id, name, local_name, continent, iso2, iso3')
    .eq('id', id)
    .single()

  if (error) {
    console.error(error)
    throw new GraphQLError('Country not found')
  }

  return country
}

export const countries = async (): Promise<[Country]> => {
  const { data: countries, error } = await supabase
    .from('countries')
    .select('id, name, local_name, continent, iso2, iso3')
    .order('name', { ascending: true })

  if (error) {
    console.error(error)
    throw new GraphQLError('Could not fetch Countries.')
  }

  return countries as [Country]
}

export const updateCountry = async ({ id, input }): Promise<Country> => {
  const { data: countries, error } = await supabase
    .from('countries')
    .update(input)
    .eq('id', id)

  if (!countries || error) {
    throw new GraphQLError('Country could not be updated')
  }

  return countries && countries[0]
}
